import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { GET_CURRENT_USER } from '../queries/';

export const SessionContext = React.createContext({
  currentUser: {}
});

const SessionContextProvider = props => {
  const { loading, error, data, refetch } = useQuery(GET_CURRENT_USER);
  const currentUser = data ? data.getCurrentUser : {};
  return (
    <SessionContext.Provider value={{ currentUser, loading, error, refetch }}>
      {props.children}
    </SessionContext.Provider>
  );
};

export default SessionContextProvider;