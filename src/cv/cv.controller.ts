import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { CV } from './cv.class';

export function insert_cv(req: Request, res: Response): void {
  const cv = new CV();
  cv.parseReq(req);

  res.status(StatusCodes.OK).json({
    message: JSON.stringify(cv)
  });
}

export async function search(req: Request, res: Response): Promise<void> {
  try {
    res.status(StatusCodes.OK).json({
      data: req.body
    });
  } catch (e: any) {
    res.status(StatusCodes.BAD_REQUEST).json({
      message: e.message
    });
  }
}
