// @flow

import React from 'react';
import styled from 'styled-components/native';
import { LoginButton, AccessToken } from 'react-native-fbsdk';
import { Alert } from 'react-native';
import { graphql } from 'react-apollo';
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
      fbAccessToken: '',
      emailError: false,
      passwordError: false,
    };
  }

  handleSubmit = () => {
    const { email, password } = this.state;

    this.props.login(email, password)
      .then(({ data }) => {
        return this.props.screenProps.changeLoginState(true, data.login.jwt);
      })
      .catch((error) => {
        if (/email/i.test(error.message)) {
          this.setState({ emailError: true });
        }
        if (/password/i.test(error.message)) {
          this.setState({ passwordError: true });
        }
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
        { this.state.emailError ? <Text>Email Error</Text> : null }
        <TextInput
          placeholder="Password"
          onChangeText={(text) => {
            this.setState({ password: text });
          }}
          value={this.state.password}
          secureTextEntry
        />
        { this.state.passwordError ? <Text>Password Error</Text> : null }
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
                Alert.alert(`login has error: ${result.error}`);
              } else if (result.isCancelled) {
                Alert.alert('login is cancelled.');
              } else {
                AccessToken.getCurrentAccessToken().then((data) => {
                    this.setState({ fbAccessToken: data.accessToken });
                });
              }
            }
          }
          onLogoutFinished={() => Alert.alert('logout.')}
        />
        <Text>{this.state.fbAccessToken}</Text>
      </MainContainer>
    );
  }
}

export default graphql(
  gql`
    mutation Login($email: String!, $password: String!) {
      login(email: $email, password: $password) {
        _id
        email
        jwt
      }
    }
  `,
  {
    props: ({ mutate }) => ({
      login: (email, password) => mutate({ variables: { email, password } }),
    }),
  },
)(Login);
