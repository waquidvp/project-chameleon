// @flow

import React from 'react';
import styled from 'styled-components/native';
import { LoginButton, AccessToken } from 'react-native-fbsdk';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';

const MainContainer = styled.View`
  flex: 1;
  background: white;
`;

const Text = styled.Text``;

const TextInput = styled.TextInput``;

const Button = styled.Button``;

class Login extends React.Component {
  static navigationOptions = {
    title: 'Login',
  }

  constructor() {
    super();

    this.state = {
      email: '',
      password: '',
      emailError: '',
      passwordError: '',
    };
  }

  handleSubmit = () => {
    const { email, password } = this.state;

    this.props.login(email, password)
      .then(({ data }) => {
        this.props.screenProps.changeLoginState(true, data.login.jwt);
      })
      .catch((error) => {
        console.warn(error);
        if (/email/i.test(error.message)) {
          this.setState({ emailError: error.message });
        }
        if (/password/i.test(error.message)) {
          this.setState({ passwordError: error.message });
        }
      });
  }

  handleLoginFb = (fbAccessToken) => {
    this.props.loginfb(fbAccessToken)
      .then(({ data }) => {
        this.props.screenProps.changeLoginState(true, data.loginfb.jwt);
      });
  }

  render() {
    const { navigation } = this.props;

    return (
      <MainContainer>
        <TextInput
          placeholder="Email"
          onChangeText={(text) => {
            this.setState({ email: text });
          }}
          value={this.state.email}
        />
        <Text>{this.state.emailError}</Text>
        <TextInput
          placeholder="Password"
          onChangeText={(text) => {
            this.setState({ password: text });
          }}
          value={this.state.password}
          secureTextEntry
        />
        <Text>{this.state.passwordError}</Text>
        <Button
          title="Login"
          onPress={() => this.handleSubmit()}
        />
        <Button
          title="Sign Up"
          onPress={() => {
            navigation.navigate('SignUp');
          }}
        />
        <LoginButton
          readPermissions={['email', 'public_profile']}
          onLoginFinished={
            (error, result) => {
              if (error) {
                console.warn(`login has error: ${result.error}`);
              } else if (result.isCancelled) {
                console.warn('login is cancelled.');
              } else {
                AccessToken.getCurrentAccessToken()
                  .then((fbAccessToken) => {
                    this.handleLoginFb(fbAccessToken.accessToken);
                  });
              }
            }
          }
          onLogoutFinished={() => console.warn('logout.')}
        />
      </MainContainer>
    );
  }
}

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

export default compose(
  graphql(
    loginMutation,
    {
      props: ({ mutate }) => ({
        login: (email, password) => mutate({ variables: { email, password } }),
      }),
    },
  ),
  graphql(
    loginfbMutation,
    {
      props: ({ mutate }) => ({
        loginfb: fbAccessToken => mutate({ variables: { fbAccessToken } }),
      }),
    },
  ),
)(Login);
