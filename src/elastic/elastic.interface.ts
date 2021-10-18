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
  [key: string]: any;
}
