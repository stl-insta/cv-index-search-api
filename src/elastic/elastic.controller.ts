import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { elasticService } from './elastic.service';

export async function create_index(req: Request, res: Response): Promise<void> {
  const { index: indexName } = req.body;

  if (!indexName) {
    res.status(StatusCodes.BAD_REQUEST).json({
      message: 'No index given'
    });
  }

  try {
    await elasticService.createIndex(indexName);

    res.status(StatusCodes.OK).json({
      message: `Index ${indexName} created successfully`
    });
  } catch (e) {
    res.status(StatusCodes.BAD_REQUEST).json({
      message: `Could not create index ${indexName}`
    });
  }
}
