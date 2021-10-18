import { Client } from '@elastic/elasticsearch';
import { IIndexMapping, IQuery } from './elastic.interface';
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

  public async searchByKeyword(index: string, query: IQuery) {
    return this.client.search(
      {
        index,
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

  public async insert<T>(index: string, document: T) {
    return this.client.create({
      id: '1',
      index,
      body: document
    });
  }
}

const elasticService = new ElasticService();

elasticService.setClient(client);
export { elasticService };
