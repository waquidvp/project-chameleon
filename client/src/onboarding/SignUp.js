// @flow

import React from 'react';
import styled from 'styled-components/native';

const MainContainer = styled.View`
  flex: 1;
  background: white;
`;

const TextInput = styled.TextInput``;

const Button = styled.Button``;

export default class SignUp extends React.Component {
  static navigationOptions = {
    title: 'Sign Up',
  }

  constructor() {
    super();

    this.state = {
      email: '',
      password: '',
      confirmPassword: '',
    };
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
        <TextInput
          placeholder="Password"
          onChangeText={(text) => {
            this.setState({ password: text });
          }}
          value={this.state.password}
          secureTextEntry
        />
        <TextInput
          placeholder="Confirm Password"
          onChangeText={(text) => {
            this.setState({ confirmPassword: text });
          }}
          value={this.state.confirmPassword}
          secureTextEntry
        />
        <Button
          title="Sign Up"
          onPress={() => {
            // TODO
          }}
        />
      </MainContainer>
    );
  }
}
