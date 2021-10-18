import { Request, Response, NextFunction } from 'express';
import { getReasonPhrase, StatusCodes } from 'http-status-codes';

/**
 * Error response middleware for 404 not found.
 *
 * @param _
 * @param  {Response} res
 * @param __
 * @returns <void>
 */
export default function notFoundError(
  _: Request,
  res: Response,
  // eslint-disable-next-line no-unused-vars
  __: NextFunction
): void {
  res.status(StatusCodes.NOT_FOUND).json({
    error: {
      code: StatusCodes.NOT_FOUND,
      message: getReasonPhrase(StatusCodes.NOT_FOUND)
    }
  });
}
