import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import { SessionContext } from '../context/session';

const withAuth = Component => props => {
  const { currentUser, loading, error } = useContext(SessionContext);

  if (loading) return null;
  if (error) return null;

  return currentUser ? <Component {...props} /> : <Redirect to="/" />;
};

export default withAuth;
