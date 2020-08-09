import React, { FC } from 'react';
// Hooks
import { useQuery, useMutation } from 'react-apollo';
// GraphQL
import { gql } from 'apollo-boost';
// Types
import { ListingsData, DelListingData, DelListingVariables } from './types';

const queryListings = gql`
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

const mutationDelListing = gql`
  mutation DeleteListing($id: ID!) {
    deleteListing(id: $id) {
      id
    }
  }
`;

export const Listings: FC = (): JSX.Element => {
  const { loading, data, error, refetch } = useQuery<ListingsData>(queryListings);
  const [delListing, { loading: delLoading, error: delError }] = useMutation<DelListingData, DelListingVariables>(
    mutationDelListing
  );

  const handleDeleteListing = async (id: string) => {
    await delListing({ variables: { id } });
    refetch();
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
