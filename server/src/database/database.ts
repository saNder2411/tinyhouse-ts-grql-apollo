import { MongoClient } from 'mongodb';
// Types
import { Database } from '../lib/types';

const URL = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_USER_PASSWORD}@${process.env.DB_CLUSTER}.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

export const connectDatabase = async (): Promise<Database> => {
  const client = await MongoClient.connect(URL, { useNewUrlParser: true, useUnifiedTopology: true });

  const db = client.db('main');

  return {
    listings: db.collection('test_listings'),
  };
};
