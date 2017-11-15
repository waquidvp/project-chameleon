// @flow

import React from 'react';
import styled from 'styled-components/native';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

const MainContainer = styled.View`
  flex: 1;
  background: white;
`;

const TextInput = styled.TextInput``;

const Text = styled.Text``;

const Button = styled.Button``;

class SignUp extends React.Component {
  static navigationOptions = {
    title: 'Sign Up',
  }

  constructor() {
    super();

    this.state = {
      email: '',
      password: '',
      confirmPassword: '',
      confirmPasswordError: false,
      emailError: false,
      passwordError: false,
    };
  }

  handleSubmit = () => {
    const { email, password, confirmPassword } = this.state;

    if (password === confirmPassword) {
      this.props.signup(email, password)
        .then(({ data }) => {
          return this.props.screenProps.changeLoginState(true, data.signup.jwt);
        })
        .catch((error) => {
          if (/email/i.test(error.message)) {
            this.setState({ emailError: true });
          }

          if (/password/i.test(error.message)) {
            this.setState({ passwordError: true });
          }
        });
    } else {
      this.setState({ confirmPasswordError: true });
    }
  }

  render() {
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
        <TextInput
          placeholder="Confirm Password"
          onChangeText={(text) => {
            this.setState({ confirmPassword: text });
          }}
          value={this.state.confirmPassword}
          secureTextEntry
        />
        { this.state.confirmPasswordError ? <Text>Passwords dont match</Text> : null }
        <Button
          title="Sign Up"
          onPress={() => this.handleSubmit()}
        />
      </MainContainer>
    );
  }
}

export default graphql(
  gql`
    mutation SignUp($email: String!, $password: String!) {
      signup(email: $email, password: $password) {
        _id
        email
        jwt
      }
    }
  `,
  {
    props: ({ mutate }) => ({
      signup: (email, password) => mutate({ variables: { email, password } }),
    }),
  },
)(SignUp);
