import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import config from '../config/config';
import logger from '../utils/logger';

const { name, version } = config;

/**
 * Handle / GET request, responds API information.
 *
 * @param _
 * @param {Response} res
 * @returns {void}
 */
export function index(_: Request, res: Response): void {
  res.status(StatusCodes.OK).json({
    name,
    version
  });
}

/**
 * Test error messages on logstash
 * @param _
 * @param res
 */
export function triggerErrorLog(_: Request, res: Response): void {
  logger.error('oops there is a problem', { foo: 'bar' });
  res.status(StatusCodes.BAD_REQUEST).json({
    message: 'Error triggered'
  });
}
