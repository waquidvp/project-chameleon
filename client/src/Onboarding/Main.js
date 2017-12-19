// @flow

import React, { Component } from 'react';
import styled from 'styled-components/native';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import { AccessToken, LoginManager } from 'react-native-fbsdk';
import PropTypes from 'prop-types';

import KeyboardDismissHOC from '../components/KeyboardDismissHOC';
import BlurredCamera from './components/BlurredCamera';
import OnboardingStack from './OnboardingStack';

const MainContainer = styled.View`
  flex: 1;
`;

const Text = styled.Text``;

const StackNavigatorContainer = styled.View`
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  flex: 1;
  background: #37cac3b4;
`;

const KeyboardDismissView = KeyboardDismissHOC(MainContainer);

class Main extends Component {
  static propTypes = {
    // The following are injected by graphql

    // login(email: string, password: string)
    login: PropTypes.func,

    // signup(email: string, password: string)
    signup: PropTypes.func,

    // loginfb(fbAccessToken: string)
    loginfb: PropTypes.func,

    // changeLoginState(loggedIn: Boolean, jwt: String) adds jwt and logs in user
    changeLoginState: PropTypes.func,
  };

  static navigationOptions = {
    title: 'Login',
  };

  state = {
    email: '',
    password: '',
    confirmPassword: '',
    loginSignupError: '',
  };

  setEmail = (email: String) => {
    this.setState({ email });
  };

  setPassword = (password: String) => {
    this.setState({ password });
  };

  setConfirmPassword = (confirmPassword: String) => {
    this.setState({ confirmPassword });
  };

  // Errors from graphql and others are passed and the appropriate message is shown on screen
  handleError = (error) => {
    if (/email/i.test(error.message)) {
      this.setState({ loginSignupError: error.message });
    }
    if (/password/i.test(error.message)) {
      this.setState({ loginSignupError: error.message });
    }
  };

  // Uses the current users facebook access token to login user
  authenticateWithFBAccessToken = () => {
    const { loginfb, changeLoginState } = this.props;

    AccessToken.getCurrentAccessToken().then((fbAccessToken) => {
      loginfb(fbAccessToken).then(({ data }) => {
        changeLoginState(true, data.loginfb.jwt);
      });
    });
  };

  // Initiates the facebook login page managed by LoginManager
  handleLoginFb = () => {
    LoginManager.logInWithReadPermissions(['email', 'public_profile']).then((error, result) => {
      if (error) {
        console.warn(`login has error: ${result.error}`);
      } else {
        this.authenticateWithFBAccessToken();
      }
    });
  };

  // The user is logged in with email and password, errors are also shown
  handleLogin = () => {
    const { email, password } = this.state;
    const { changeLoginState, login } = this.props;

    login(email, password)
      .then(({ data }) => {
        changeLoginState(true, data.login.jwt);
      })
      .catch((error) => {
        console.warn(error);
        this.handleError(error);
      });
  };

  // An account is made for the user if both passwords match, other errors are also shown
  handleSignup = () => {
    const { email, password, confirmPassword } = this.state;
    const { changeLoginState, signup } = this.props;

    if (password === confirmPassword) {
      signup(email, password)
        .then(({ data }) => {
          changeLoginState(true, data.signup.jwt);
        })
        .catch((error) => {
          console.warn(error);
          this.handleError(error);
        });
    } else {
      this.setState({ loginSignupError: "Passwords don't match" });
    }
  };

  render() {
    const { loginSignupError } = this.state;
    const {
      handleLogin,
      handleLoginFb,
      handleSignup,
      setEmail,
      setPassword,
      setConfirmPassword,
    } = this;

    return (
      <KeyboardDismissView>
        <BlurredCamera />
        <StackNavigatorContainer>
          <OnboardingStack
            screenProps={{
              loginSignupError,
              handleLogin,
              handleLoginFb,
              handleSignup,
              setEmail,
              setPassword,
              setConfirmPassword,
            }}
          />
        </StackNavigatorContainer>
      </KeyboardDismissView>
    );
  }
}

// The following are graphql mutations for all login/signup functions

const loginMutation = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      _id
      email
      jwt
    }
  }
`;

const loginfbMutation = gql`
  mutation loginfb($fbAccessToken: String!) {
    loginfb(fbAccessToken: $fbAccessToken) {
      _id
      email
      jwt
    }
  }
`;

const signupMutation = gql`
  mutation signup($email: String!, $password: String!) {
    signup(email: $email, password: $password) {
      _id
      email
      jwt
    }
  }
`;

export default compose(
  graphql(loginMutation, {
    props: ({ mutate }) => ({
      login: (email, password) => mutate({ variables: { email, password } }),
    }),
  }),
  graphql(loginfbMutation, {
    props: ({ mutate }) => ({
      loginfb: fbAccessToken => mutate({ variables: { fbAccessToken } }),
    }),
  }),
  graphql(signupMutation, {
    props: ({ mutate }) => ({
      signup: (email, password) => mutate({ variables: { email, password } }),
    }),
  }),
)(Main);
