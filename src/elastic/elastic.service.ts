import { Client } from '@elastic/elasticsearch';
import {
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

  public async searchByKeyword(header: ISearchDocumentHeader, query: IQuery) {
    return this.client.search(
      {
        ...header,
        body: {
          query: {
            match_all: query
          }
        }
      },
      {
        ignore: [404],
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
}

const elasticService = new ElasticService();

elasticService.setClient(client);
export { elasticService };
