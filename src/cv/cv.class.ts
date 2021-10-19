import { ICV } from './cv.interface';
import { Request } from 'express';

export class CV implements ICV {
  content!: string;
  url!: string;

  static fromRequest = (req: Request): CV => {
    let cv = new CV();
    Object.assign(cv, {
      content: req.body.content,
      url: req.body.url
    });
    return cv;
  };

  serialize = (): string => {
    return JSON.stringify(this);
  };
}
