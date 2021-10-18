import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { CV } from './cv.class';

import * as url from 'url';
import { v4 as uuidv4 } from 'uuid';
import { elasticService } from '../elastic/elastic.service';
import { IQueryCV, ICV, CV_INDEX } from './cv.interface';
import {
  IInsertDocumentHeader,
  ISearchDocumentHeader
} from '../elastic/elastic.interface';

export async function insert(req: Request, res: Response): Promise<void> {
  const cv = CV.fromRequest(req);
  const id = uuidv4();
  const header: IInsertDocumentHeader = {
    id,
    type: '_doc',
    index: CV_INDEX
  };
  try {
    const result = await elasticService.insert<ICV>(header, cv);
    res.status(StatusCodes.OK).json({
      message: 'CV inserted successfully',
      data: result
    });
  } catch (e) {
    res.status(StatusCodes.BAD_REQUEST).json({
      message: `Could not insert CV`,
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
    res.status(StatusCodes.OK).json({
      data: result
    });
  } catch (e: any) {
    res.status(StatusCodes.BAD_REQUEST).json({
      message: e.message
    });
  }
}
