import React from 'react';
import { useHistory } from 'react-router-dom';
import { useApolloClient } from "@apollo/react-hooks";
import Button from 'react-bootstrap/Button'

const SignOut = () => {

  let history = useHistory();
  const client = useApolloClient();
  
  const handleSignOut = () => {
    localStorage.setItem('token', '')
    client.resetStore();
    history.push('/');
  }

  return (
    <Button variant="outline-light" onClick={handleSignOut}>Sign out</Button>
  );
}

export default SignOut;