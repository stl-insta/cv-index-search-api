import { Client, ClientOptions } from '@elastic/elasticsearch';
import config from '../config/config';

class ElasticService {
  public client!: Client;

  public async createIndex(indexName: string) {
    const res = await this.client.indices.exists({
      index: indexName
    });

    if (res) return;

    return this.client.indices.create({
      index: indexName
    });
  }

  public setClient(client: Client) {
    this.client = client;
  }

  public async search(options: any) {
    return this.client.search(options);
  }

  public async insert(index: string, document: Record<string, unknown>) {
    return this.client.create({
      id: '1',
      index,
      body: document
    });
  }
}

const options: ClientOptions = {
  node: config.elastic.url
};

const elasticService = new ElasticService();

let client: Client;

try {
  client = new Client(options);
  elasticService.setClient(client);
} catch (e) {
  console.error('Cannot connect to client', e);
}

export { elasticService };
