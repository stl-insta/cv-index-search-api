import { ICV } from './cv.interface';
import { Request } from 'express';

export class CV implements ICV {
  id!: any;
  content!: string;
  url!: string;

  parseReq = (req: Request) => {
    Object.assign(this, req.body);
  };
}
