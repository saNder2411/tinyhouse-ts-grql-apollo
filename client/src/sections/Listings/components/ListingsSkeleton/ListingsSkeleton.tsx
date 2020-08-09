import React, { FC } from 'react';
// Antd Components
import { Skeleton, Divider, Alert } from 'antd';
// Styles
import './styles/ListingsSkeleton.css';

interface Props {
  error?: boolean;
}

export const ListingsSkeleton: FC<Props> = ({ error = false }): JSX.Element => {
  const errorJSX = error ? (
    <Alert className="listings-skeleton__alert" type="error" message="Something went wrong - please try again later." />
  ) : null;
  return (
    <div className="listings-skeleton">
      {errorJSX}
      <Skeleton active paragraph={{ rows: 1 }} />
      <Divider />
      <Skeleton active paragraph={{ rows: 1 }} />
      <Divider />
      <Skeleton active paragraph={{ rows: 1 }} />
    </div>
  );
};
