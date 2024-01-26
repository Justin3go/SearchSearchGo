import { Client } from '@elastic/elasticsearch';

export const client = new Client({
  node: process.env.ES_URL,
  auth: {
    username: process.env.ES_AUTH_USERNAME || '',
    password: process.env.ES_AUTH_PASSWORD || ''
  }
});