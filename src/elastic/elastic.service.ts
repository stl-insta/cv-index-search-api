import { Client } from '@elastic/elasticsearch';
import {
  IDeleteDocumentHeader,
  IGetDocumentHeader,
  IIndexMapping,
  IInsertDocumentHeader,
  IQuery,
  ISearchDocumentHeader
} from './elastic.interface';
import { client } from './elastic.config';

class ElasticService {
  public client!: Client;

  public setClient(_client: Client) {
    this.client = _client;
  }

  public async getIndex(indexName: string) {
    return this.client.indices.get({
      index: indexName
    });
  }

  public async createIndex(indexName: string) {
    return this.client.indices.create({
      index: indexName
    });
  }

  public async deleteIndex(indexName: string) {
    return this.client.indices.delete({
      index: indexName
    });
  }

  public async updateIndex(indexName: string, mapping: IIndexMapping) {
    return this.client.indices.putMapping({
      index: indexName,
      body: {
        properties: mapping
      }
    });
  }

  public async searchByKeywords(header: ISearchDocumentHeader, _query: IQuery) {
    const buildQuery = (query: IQuery) => {
      const should: any[] = [];
      Object.keys(query).forEach((key: string) => {
        query[key].forEach((value: string) => {
          should.push({
            match: {
              [key]: value
            }
          });
        });
      });
      return {
        query: {
          bool: {
            should
          }
        }
      };
    };
    return this.client.search(
      {
        ...header,
        body: buildQuery(_query)
      },
      {
        ignore: [404],
        maxRetries: 3
      }
    );
  }

  public async searchByMatchAll(header: ISearchDocumentHeader) {
    return this.client.search(
      {
        ...header,
        body: {
          query: { match_all: {} }
        }
      },
      {
        maxRetries: 3
      }
    );
  }

  public async insert<T>(header: IInsertDocumentHeader, document: T) {
    return this.client.index({
      ...header,
      body: document
    });
  }

  public async get(header: IGetDocumentHeader) {
    return this.client.get({
      ...header
    });
  }

  public async delete(header: IDeleteDocumentHeader) {
    return this.client.delete({
      ...header
    });
  }
}

const elasticService = new ElasticService();

elasticService.setClient(client);
export { elasticService };
