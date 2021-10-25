import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { elasticService } from './elastic.service';
import url from 'url';
import { IIndexMapping } from './elastic.interface';
import Error from '../resources/exceptions/Error';

export async function delete_index(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
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
    const error = new Error(
      `Could not delete index ${indexName}`,
      StatusCodes.BAD_REQUEST
    );
    next(error);
  }
}

export async function create_index(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
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
    const error = new Error(
      `Could not create index ${indexName}`,
      StatusCodes.BAD_REQUEST
    );
    next(error);
  }
}

export async function update_index(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const { name: indexName } = url.parse(req.url, true).query;
  const mapping: IIndexMapping = req.body.mapping;

  if (!indexName) {
    res.status(StatusCodes.BAD_REQUEST).json({
      message: 'No index given'
    });
  }

  try {
    const result = await elasticService.updateIndex(
      <string>indexName,
      <IIndexMapping>mapping
    );

    res.status(StatusCodes.OK).json({
      message: `Index ${indexName} updated successfully`,
      data: result
    });
  } catch (e) {
    const error = new Error(
      `Could not update index ${indexName}`,
      StatusCodes.BAD_REQUEST
    );
    next(error);
  }
}

export async function get_index(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const { name: indexName } = url.parse(req.url, true).query;

  if (!indexName) {
    res.status(StatusCodes.BAD_REQUEST).json({
      message: 'No index given'
    });
  }

  try {
    const result = await elasticService.getIndex(<string>indexName);

    res.status(StatusCodes.OK).json({
      message: `Index ${indexName} fetched successfully`,
      data: result
    });
  } catch (e) {
    const error = new Error(
      `Could not get index ${indexName}`,
      StatusCodes.BAD_REQUEST
    );
    next(error);
  }
}
