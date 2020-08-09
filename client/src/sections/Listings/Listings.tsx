import React, { FC } from 'react';
// Server Hooks
import { useQuery, useMutation } from '../../lib/api';
// Types
import { ListingsData, DelListingData, DelListingVariables } from './types';

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
  const { loading, data, error, refresh } = useQuery<ListingsData>(LISTINGS);
  const [{ loading: delLoading, error: delError }, delListing] = useMutation<DelListingData, DelListingVariables>(
    DELETE_LISTING
  );

  const handleDeleteListing = async (id: string) => {
    await delListing({ id });
    refresh();
  };

  const listings = data ? data.listings : null;

  const listingsList = listings ? (
    <ul>
      {listings.map(({ title, id }) => (
        <li key={id}>
          {title}
          <button onClick={() => handleDeleteListing(id)}>Delete</button>
        </li>
      ))}
    </ul>
  ) : null;

  if (loading) return <h2>Loading...</h2>;

  if (error) return <h2>Something went wrong - please try again later.</h2>;

  const delListingLoadingJSX = delLoading ? <h4>Deletion in progress...</h4> : null;

  const delListingErrorJSX = delError ? <h4>Something went wrong with deleting - please try again later.</h4> : null;

  return (
    <>
      <h2>TinyHouse Listings</h2>
      {listingsList}
      {delListingLoadingJSX}
      {delListingErrorJSX}
    </>
  );
};
