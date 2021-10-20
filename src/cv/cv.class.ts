import { ICV } from './cv.interface';
import { Request } from 'express';

export class CV implements ICV {
  content!: string;
  url!: string;

  setData(data: { content: string; url: string }) {
    Object.assign(this, data);
  }

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
