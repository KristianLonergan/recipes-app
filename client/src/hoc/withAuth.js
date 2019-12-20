import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Redirect } from 'react-router-dom';
import { GET_CURRENT_USER } from '../queries/';

const withAuth = conditionFunc => Component => props => {
  const { loading, error, data } = useQuery(GET_CURRENT_USER);

  if (loading) return null;
  if (error) return null;

  return conditionFunc(data) ? <Component {...props} /> : <Redirect to="/" />;
};

export default withAuth;
