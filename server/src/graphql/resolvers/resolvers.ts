// import { IResolvers } from 'apollo-server-express';
import { viewerResolvers } from './Viewer';

export const resolvers = {
  Query: {
    ...viewerResolvers.Query,
  },
  Mutation: {
    ...viewerResolvers.Mutation,
  },
};
