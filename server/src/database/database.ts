import { MongoClient } from 'mongodb';

const user = `user_001`;
const userPassword = `xOEJdbPMf9zarrAD`;
const cluster = `cluster0.0fvfz`;
const dbName = `main`;

const URL = `mongodb+srv://${user}:${userPassword}@${cluster}.mongodb.net/${dbName}?retryWrites=true&w=majority`;

export const connectDatabase = async (): Promise<MongoClient> => {
  const client = await MongoClient.connect(URL, { useNewUrlParser: true });

  return client;
};
