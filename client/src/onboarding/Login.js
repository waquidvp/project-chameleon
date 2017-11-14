// @flow

import React from 'react';
import styled from 'styled-components/native';
import { LoginButton, AccessToken } from 'react-native-fbsdk';
import { Alert } from 'react-native';

const MainContainer = styled.View`
  flex: 1;
  background: white;
`;

const Text = styled.Text``;

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
      fbAccessToken: '',
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
