// @flow

import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { setContext } from 'apollo-link-context';

import { getToken } from '../utils/token';

export const GRAPHQL_ENDPOINT_URI = 'http://10.0.2.2:8080/graphql';

const httpLink = new HttpLink({ uri: GRAPHQL_ENDPOINT_URI });
const authLink = setContext(async (req, { headers }) => {
  const token = await getToken();

  if (token) {
    return {
      headers: {
        ...headers,
        authorization: `Bearer ${token}`,
      },
    };
  } else if (!token) {
    return {
      headers,
    };
  }
});

const link = authLink.concat(httpLink);

const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});

export default client;
