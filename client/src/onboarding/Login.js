// @flow

import React from 'react';
import styled from 'styled-components/native';

const MainContainer = styled.View`
  flex: 1;
  background: white;
`;

const TextInput = styled.TextInput``;

const Button = styled.Button``;

export default class Login extends React.Component {
  static navigationOptions = {
    title: 'Login',
  }

  constructor() {
    super();

    this.state = {
      email: '',
      password: '',
    };
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
        <TextInput
          placeholder="Password"
          onChangeText={(text) => {
            this.setState({ password: text });
          }}
          value={this.state.password}
          secureTextEntry
        />
        <Button
          title="Login"
          onPress={() => {
            // TODO
          }}
        />
        <Button
          title="Sign Up"
          onPress={() => {
            navigation.navigate('SignUp');
          }}
        />
      </MainContainer>
    );
  }
}
