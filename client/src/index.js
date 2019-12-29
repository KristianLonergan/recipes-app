import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import App from './App';
import NavBar from './components/NavBar/NavBar';
import SessionContextProvider from './context/session';

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
      console.error('Network Error', networkError);
    }
  }
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <BrowserRouter>
      <SessionContextProvider>
        <NavBar />
        <App />
      </SessionContextProvider>
    </BrowserRouter>
  </ApolloProvider>,
  document.getElementById('root')
);
