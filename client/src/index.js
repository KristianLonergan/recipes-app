import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import withSession from './hoc/withSession';
import App from './App';
import NavBar from './components/NavBar/NavBar';

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  fetchOptions: {
    credentials: 'include'
  },
  request: operation => {
    const token = localStorage.getItem('token');
    operation.setContext({
      headers: {
        authorization: token
      }
    });
  },
  onError: ({ networkError }) => {
    if (networkError) {
      console.log('Network Error', networkError);

      // if (networkError.statusCode === 401) {
      //   localStorage.setItem('token', '');
      // }
    }
  }
});

const root = ({ refetch, session }) => (
  <BrowserRouter>
    <NavBar session={session}/>
    <App refetch={refetch} session={session} />
  </BrowserRouter>
);

const RootWithSession = withSession(root);

ReactDOM.render(
  <ApolloProvider client={client}>
    <RootWithSession />
  </ApolloProvider>,
  document.getElementById('root')
);
