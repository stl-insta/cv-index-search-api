export interface ICV {
  content: string;
  url: string;
}

export interface IQueryCV {
  [content: string]: string[];
}

export const CV_INDEX = 'cvs';
