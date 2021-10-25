import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import * as url from 'url';
import { v4 as uuidv4 } from 'uuid';
import { elasticService } from '../elastic/elastic.service';
import { CV_INDEX, ICV, IQueryCV } from './cv.interface';
import {
  IDeleteDocumentHeader,
  IGetDocumentHeader,
  IInsertDocumentHeader,
  ISearchDocumentHeader
} from '../elastic/elastic.interface';

import Error from '../resources/exceptions/Error';
import { UploadedFile } from 'express-fileupload';
import { CV } from './cv.class';
import { FILETYPE } from '../resources/constants/filetype';
import wordParser from '../utils/parser/docx';
import pdfParser from '../utils/parser/pdf';
import { promiseWithTimeout } from '../utils/promise-with-timeout';

export async function insertToElastic(cv: ICV): Promise<string> {
  const id = uuidv4();
  const header: IInsertDocumentHeader = {
    id,
    type: '_doc',
    index: CV_INDEX
  };
  const result = await elasticService.insert<ICV>(header, cv);
  if (!result) {
    return Promise.reject('Could not insert CV in elastic');
  }
  return Promise.resolve(id);
}

export async function get(req: Request, res: Response): Promise<void> {
  const { id } = url.parse(req.url, true).query;

  if (!id) {
    res.status(StatusCodes.BAD_REQUEST).json({
      message: `No id given`
    });
  }
  const header: IGetDocumentHeader = {
    id: id as string,
    index: CV_INDEX
  };
  try {
    const data = await elasticService.get(header);
    const buildResponse = (result: any) => {
      return {
        id: result?.body?._id,
        type: result?.body?._type,
        url: result?.body?._source?.url,
        name: result?.body?._source?.url
          .replace(/^.*[\\/]/, '')
          .replace(/\.[^/.]+$/, '')
      };
    };
    res.status(StatusCodes.OK).json({
      message: 'CV fetched successfully',
      data: buildResponse(data)
    });
  } catch (e) {
    res.status(StatusCodes.BAD_REQUEST).json({
      message: `Could not get CV`,
      data: e
    });
  }
}

export async function remove(req: Request, res: Response): Promise<void> {
  const { id } = url.parse(req.url, true).query;

  if (!id) {
    res.status(StatusCodes.BAD_REQUEST).json({
      message: `No id given`
    });
  }
  const header: IDeleteDocumentHeader = {
    id: id as string,
    index: CV_INDEX
  };
  try {
    const data = await elasticService.delete(header);
    const buildResponse = (result: any) => {
      return {
        id: result?.body?._id
      };
    };
    res.status(StatusCodes.OK).json({
      message: 'CV deleted successfully',
      data: buildResponse(data)
    });
  } catch (e) {
    res.status(StatusCodes.BAD_REQUEST).json({
      message: `Could not delete CV`,
      data: e
    });
  }
}

export async function list(_req: Request, res: Response): Promise<void> {
  const header: ISearchDocumentHeader = {
    index: CV_INDEX
  };

  try {
    const result = await elasticService.searchByMatchAll(header);
    const buildResponse = (response: any): ICV[] => {
      return (<any[]>response?.body?.hits?.hits).map(
        (hit: Record<string, any>) => {
          return {
            id: hit._id,
            type: hit._type,
            name: hit._source?.url
              .replace(/^.*[\\/]/, '')
              .replace(/\.[^/.]+$/, ''),
            ...hit._source
          };
        }
      );
    };
    res.status(StatusCodes.OK).json({
      data: buildResponse(result)
    });
  } catch (e: any) {
    res.status(StatusCodes.BAD_REQUEST).json({
      message: e.message
    });
  }
}

export async function search(req: Request, res: Response): Promise<void> {
  const { keywords } = url.parse(req.url, true).query;

  if (!keywords) {
    res.status(StatusCodes.BAD_REQUEST).json({
      message: 'No keywords supplied'
    });
  }

  const query: IQueryCV = {
    content: (<string>keywords).split(',')
  };

  const header: ISearchDocumentHeader = {
    index: CV_INDEX
  };

  try {
    const result = await elasticService.searchByKeywords(header, query);
    const buildResponse = (response: any): ICV[] => {
      return (<any[]>response?.body?.hits?.hits).map(
        (hit: Record<string, any>) => {
          return {
            id: hit._id,
            type: hit._type,
            score: hit._score,
            name: hit._source?.url
              .replace(/^.*[\\/]/, '')
              .replace(/\.[^/.]+$/, ''),
            ...hit._source
          };
        }
      );
    };
    res.status(StatusCodes.OK).json({
      data: buildResponse(result)
    });
  } catch (e: any) {
    res.status(StatusCodes.BAD_REQUEST).json({
      message: e.message
    });
  }
}

export const create = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req?.files?.cvs) {
    next(new Error('CV not supplied', StatusCodes.BAD_REQUEST));
    return;
  }
  try {
    let cvs = req!.files!.cvs;
    let createdCVS: ICV[];

    if (!Array.isArray(cvs)) {
      cvs = [cvs];
    }

    /** Extract text from file to CV Object **/
    const fileToParse: Promise<ICV>[] = [];

    for (const cv of cvs) {
      const fileName = cv.name.replace(/\.[^/.]+$/, '');
      switch (cv.mimetype) {
        case FILETYPE.PDF:
          fileToParse.push(handleFile(cv, fileName, 'pdf', pdfParser));
          break;
        case FILETYPE.DOCX_1 || FILETYPE.DOCX_2:
          fileToParse.push(handleFile(cv, fileName, 'docx', wordParser));
          break;
      }
    }
    createdCVS = await Promise.all(fileToParse);

    /** Insert CVs into elastic search **/
    const inserts = createdCVS.map((cv: ICV) => insertToElastic(cv));
    const inserted = await Promise.all(inserts);

    res.status(StatusCodes.CREATED).json({
      message: 'CVs inserted successfully',
      data: inserted.map((i) => ({ id: i }))
    });
  } catch (e) {
    next(e);
  }
};

const handleFile = async (
  cv: UploadedFile,
  fileName: string,
  type: string,
  // eslint-disable-next-line no-unused-vars
  parser: (...arg: any) => Promise<string>
): Promise<ICV> => {
  await cv.mv(`./assets/cv/${type}/${cv.name}`);
  const pathFile = `./assets/cv/${type}/${fileName}.${type}`;

  const text: string = await promiseWithTimeout<string>(
    parser(pathFile, fileName),
    10000,
    new Error(
      `Parse file timeout with ${fileName}`,
      StatusCodes.REQUEST_TIMEOUT
    )
  );

  const newCV = new CV();
  newCV.setData({ content: text, url: pathFile.slice(2) });
  return Promise.resolve(newCV);
};
