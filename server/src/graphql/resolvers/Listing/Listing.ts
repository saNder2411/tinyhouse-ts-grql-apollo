import { ObjectID } from 'mongodb';
// Types
import { Database, Listing } from '../../../lib/types';

export interface Context {
  db: Database;
}

export const listingResolvers = {
  Query: {
    listings: async (_root: undefined, _args: unknown, { db }: Context): Promise<Listing[]> => {
      return await db.listings.find({}).toArray();
    },
  },
  Mutation: {
    deleteListing: async (_root: undefined, { id }: { id: string }, { db }: Context): Promise<Listing> => {
      const deletedRes = await db.listings.findOneAndDelete({ _id: new ObjectID(id) });

      if (!deletedRes.value) {
        throw new Error('failed to delete listing');
      }

      return deletedRes.value;
    },
  },
  Listing: {
    id: (listing: Listing): string => listing._id.toHexString(),
  },
};
