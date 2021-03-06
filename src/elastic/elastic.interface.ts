export interface ICreateIndex {
  index: string;
}

interface IProperty {
  type: string;
  index: boolean;
}

export interface IIndexMapping {
  mapping: Record<string, IProperty>;
}

export interface IQuery {
  [key: string]: string[];
}

export interface IGetDocumentHeader {
  id: string;
  index: string;
}

export interface IInsertDocumentHeader {
  id: string;
  index: string;
  type: string;
}

export interface ISearchDocumentHeader {
  index: string;
}

export interface IDeleteDocumentHeader {
  id: string;
  index: string;
}
