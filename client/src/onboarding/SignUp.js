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
      emailError: '',
      passwordError: '',
    };
  }

  handleSubmit = () => {
    const { email, password, confirmPassword } = this.state;

    if (password === confirmPassword) {
      this.props.signup(email, password)
        .then(({ data }) => {
          this.props.screenProps.changeLoginState(true, data.signup.jwt);
        })
        .catch((error) => {
          if (/email/i.test(error.message)) {
            this.setState({ emailError: error.message });
          }

          if (/password/i.test(error.message)) {
            this.setState({ passwordError: error.message });
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
    mutation signup($email: String!, $password: String!) {
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
