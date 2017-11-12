// @flow

import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

export const GRAPHQL_ENDPOINT_URI = 'http://localhost:8080/graphql';

const client = new ApolloClient({
  link: new HttpLink({ uri: GRAPHQL_ENDPOINT_URI }),
  cache: new InMemoryCache(),
});

export default client;
