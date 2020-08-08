import React, { FC } from 'react';
// Server
import { server } from '../../lib/api';
// Types
import { ListingsData, DeleteListingData, DeleteListingVariables } from './types';

const LISTINGS = `
  query Listings {
    listings {
      id
      title
      image
      address
      price
      numOfGuests
      numOfBeds
      numOfBaths
      rating
    }
  }
`;

const DELETE_LISTING = `
  mutation DeleteListing($id: ID!) {
    deleteListing(id: $id) {
      id
    }

  }
`;

export const Listings: FC = (): JSX.Element => {
  const fetchingListings = async (): Promise<void> => {
    const { data } = await server.fetch<ListingsData>({ query: LISTINGS });
    console.log(data);
  };

  const deleteListing = async () => {
    const { data } = await server.fetch<DeleteListingData, DeleteListingVariables>({
      query: DELETE_LISTING,
      variables: { id: `5f2b9830ce0b874b18779edb` },
    });

    console.log(`deleteListing`, data);
  };
  return (
    <>
      <h2>TinyHouse Listings</h2>
      <button onClick={fetchingListings}>Query Listing!</button>
      <button onClick={deleteListing}>Delete a Listing!</button>
    </>
  );
};
