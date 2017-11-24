// @flow

import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { setContext } from 'apollo-link-context';
import { onError } from 'apollo-link-error';
import { from } from 'apollo-link';

import { getToken } from '../utils/token';

export const GRAPHQL_ENDPOINT_URI = 'http://10.0.2.2:8080/graphql';

const httpLink = new HttpLink({ uri: GRAPHQL_ENDPOINT_URI });

const errorLink = onError((error) => {
  console.warn(error);
});

const authMiddleware = setContext(async (req, { headers }) => {
  const token = await getToken();

  if (token) {
    return {
      headers: {
        ...headers,
        authorization: `Bearer ${token}`,
      },
    };
  }

  return {
    headers,
  };
});

const link = from([
  errorLink,
  authMiddleware,
  httpLink,
]);

const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});

export default client;
