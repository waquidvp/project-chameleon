// @flow

import React from 'react';
import { ApolloProvider } from 'react-apollo';

import client from './api/gql-client';
import OnboardingStack from './Onboarding/OnboardingStack';
import Home from './Home/Home';
import { signIn, signOut, getToken } from './utils/token';

export default class App extends React.Component {
  constructor() {
    super();

    this.state = {
      loggedIn: false,
    };
  }

  async componentWillMount() {
    const token = await getToken();

    if (token) {
      this.setState({ loggedIn: true });
    }
  }

  handleChangeLoginState = (loggedIn = false, jwt) => {
    this.setState({ loggedIn });

    if (loggedIn) {
      signIn(jwt);
    } else {
      signOut();
    }
  }

  render() {
    return (
      <ApolloProvider client={client}>
        {this.state.loggedIn ?
          <Home screenProps={{ changeLoginState: this.handleChangeLoginState }} /> :
          <OnboardingStack screenProps={{ changeLoginState: this.handleChangeLoginState }} />}
      </ApolloProvider>
    );
  }
}
