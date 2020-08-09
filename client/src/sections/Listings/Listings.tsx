import React, { FC } from 'react';
// Ant Components
import { List, Avatar, Button, Spin, Alert } from 'antd';
import { ListingsSkeleton } from './components';
// Hooks
import { useQuery, useMutation } from 'react-apollo';
// GraphQL
import { gql } from 'apollo-boost';
// Types
import { Listings as ListingsData } from './__generated__/Listings';
import {
  DeleteListing as DelListingData,
  DeleteListingVariables as DelListingVariables,
} from './__generated__/DeleteListing';

// Styles
import './styles/Listings.css';

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

  const listingsListJSx = listings ? (
    <List
      itemLayout="horizontal"
      dataSource={listings}
      renderItem={({ id, title, address, image }) => (
        <List.Item
          actions={[
            <Button type="primary" onClick={() => handleDeleteListing(id)}>
              Delete
            </Button>,
          ]}>
          <List.Item.Meta
            title={title}
            description={address}
            avatar={<Avatar src={image} shape="square" size={48} />}
          />
        </List.Item>
      )}
    />
  ) : null;

  const loadingJSX = loading && <ListingsSkeleton />;

  const errorJSX = error && <ListingsSkeleton error />;

  const delListingErrorJSX = delError ? (
    <Alert
      className="listings__alert"
      type="error"
      message="Something went wrong with deleting - please try again later."
    />
  ) : null;

  return (
    <div className="listings">
      <Spin spinning={delLoading}>
        <h2>TinyHouse Listings</h2>
        {loadingJSX}
        {errorJSX}
        {delListingErrorJSX}
        {listingsListJSx}
      </Spin>
    </div>
  );
};
