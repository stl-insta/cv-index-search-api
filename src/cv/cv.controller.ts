import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { UploadedFile } from 'express-fileupload';
import { CV } from './cv.class';

import * as url from 'url';
import { v4 as uuidv4 } from 'uuid';
import { elasticService } from '../elastic/elastic.service';
import { IQueryCV, ICV, CV_INDEX } from './cv.interface';
import {
  IDeleteDocumentHeader,
  IInsertDocumentHeader,
  ISearchDocumentHeader
} from '../elastic/elastic.interface';
import wordParser from '../utils/parser/docx';
import pdfParser from '../utils/parser/pdf';

export async function insert(req: Request, res: Response): Promise<void> {
  const cv = CV.fromRequest(req);
  const id = uuidv4();
  const header: IInsertDocumentHeader = {
    id,
    type: '_doc',
    index: CV_INDEX
  };
  try {
    const data = await elasticService.insert<ICV>(header, cv);
    const buildResponse = (result: any) => {
      return {
        id: result?.body?._id
      };
    };
    res.status(StatusCodes.OK).json({
      message: 'CV inserted successfully',
      data: buildResponse(data)
    });
  } catch (e) {
    res.status(StatusCodes.BAD_REQUEST).json({
      message: `Could not insert CV`,
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

export const create = async (req: Request, res: Response): Promise<void> => {
  try {
    if (!req.files) {
      res.send({
        status: false,
        message: 'No file uploaded'
      });
    } else {
      let data: { name: string; mimetype: string; mv: any }[] = [];
      let cvs = req.files.cvs as UploadedFile[];
      if (!Array.isArray(cvs)) {
        cvs = [cvs];
      }
      cvs.forEach((cv) => {
        const fileName = cv.name.replace(/\.[^/.]+$/, '');
        switch (cv.mimetype) {
          case 'application/pdf':
            cv.mv('./assets/cv/pdf/' + cv.name);
            pdfParser(
              `./assets/cv/pdf/${fileName}.pdf`,
              `./assets/json/pdf/${fileName}.json`
            );
            break;
          case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
            'application/msword':
            cv.mv('./assets/cv/docx/' + cv.name);
            wordParser(
              `./assets/cv/docx/${fileName}.docx`,
              `./assets/cv/xml/${fileName}.xml`,
              `./assets/json/docx/${fileName}.json`
            );
            break;
        }
        data.push({
          name: cv.name,
          mimetype: cv.mimetype,
          mv: cv.mv
        });
      });

      res.status(StatusCodes.OK).json({
        message: 'Files are uploaded',
        data: data
      });
    }
  } catch (e: any) {
    res.status(StatusCodes.BAD_REQUEST).json({
      message: e.message
    });
  }
};
