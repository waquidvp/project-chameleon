// @flow

import React from 'react';
// import { ApolloProvider } from 'react-apollo';

// import client from './api/gql-client';
import Onboarding from './Onboarding/Main';
import Home from './Home/Home';
import { signIn, signOut, getToken } from './utils/token';

export default class App extends React.Component {
  state = {
    loggedIn: false,
    render: false,
  };

  async componentWillMount() {
    const token = await getToken();

    if (token) {
      this.setState({ loggedIn: true });
    }

    this.setState({ render: true });
  }

  handleChangeLoginState = (loggedIn: Boolean = false, jwt: String) => {
    this.setState({ loggedIn });

    if (loggedIn) {
      signIn(jwt);
    } else {
      signOut();
    }
  };

  render() {
    if (this.state.render) {
      return (
        {/* <ApolloProvider client={client}> */}
          {/* {this.state.loggedIn ? ( */}
          <Home
            screenProps={{ changeLoginState: this.handleChangeLoginState }}
          />
          {/* ) : ( */}
          {/* <Onboarding changeLoginState={this.handleChangeLoginState} /> */}
          {/* )} */}
        {/* </ApolloProvider> */}
      );
    }

    return null;
  }
}
