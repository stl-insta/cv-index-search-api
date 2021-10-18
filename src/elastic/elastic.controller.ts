import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { elasticService } from './elastic.service';
import url from 'url';

export async function delete_index(req: Request, res: Response): Promise<void> {
  const { name: indexName } = url.parse(req.url, true).query;

  if (!indexName) {
    res.status(StatusCodes.BAD_REQUEST).json({
      message: 'No name given'
    });
  }

  try {
    const result = await elasticService.deleteIndex(<string>indexName);

    res.status(StatusCodes.OK).json({
      message: `Index ${indexName} deleted successfully`,
      data: result
    });
  } catch (e) {
    res.status(StatusCodes.BAD_REQUEST).json({
      message: `Could not delete index ${indexName}`,
      data: e
    });
  }
}

export async function create_index(req: Request, res: Response): Promise<void> {
  const { name: indexName } = url.parse(req.url, true).query;

  if (!indexName) {
    res.status(StatusCodes.BAD_REQUEST).json({
      message: 'No index given'
    });
  }

  try {
    const result = await elasticService.createIndex(<string>indexName);

    res.status(StatusCodes.OK).json({
      message: `Index ${indexName} created successfully`,
      data: result
    });
  } catch (e) {
    res.status(StatusCodes.BAD_REQUEST).json({
      message: `Could not create index ${indexName}`,
      data: e
    });
  }
}
