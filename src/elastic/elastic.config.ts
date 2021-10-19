import { Client, ClientOptions } from '@elastic/elasticsearch';
import config from '../config/config';

const options: ClientOptions = {
  node: config.elastic.url
};

export let client: Client;

try {
  client = new Client(options);
} catch (e) {
  console.error('Cannot connect to client', e);
}
