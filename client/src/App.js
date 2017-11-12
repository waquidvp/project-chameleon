// @flow

import React from 'react';
import { ApolloProvider } from 'react-apollo';

import client from './api/gql-client';
import OnboardingStack from './Onboarding/OnboardingStack';
import Home from './Home/Home';

export default class App extends React.Component {
  constructor() {
    super();

    this.state = {
      loggedIn: false,
    };
  }
  render() {
    return (
      <ApolloProvider client={client}>
        {this.state.loggedIn ?
          <Home /> :
          <OnboardingStack />}
      </ApolloProvider>
    );
  }
}
