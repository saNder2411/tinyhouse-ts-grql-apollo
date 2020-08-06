import { IResolvers } from 'apollo-server-express';
import { listingResolvers } from './Listing';

export const resolvers: IResolvers = {
  Query: {
    ...listingResolvers.Query,
  },
  Mutation: {
    ...listingResolvers.Mutation,
  },
  Listing: {
    ...listingResolvers.Listing,
  },
};
