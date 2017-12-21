// @flow

import React, { Component } from 'react';
import { Dimensions, StatusBar } from 'react-native';
import styled from 'styled-components/native';

import Input from '../components/Input';
import Button from '../components/Button';

const { width } = Dimensions.get('window');

const SuperContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const MainContainer = styled.View`
  justify-content: center;
  align-items: center;
  width: ${props => props.width - 40};
  max-width: 325px;
`;

const Image = styled.Image`
  width: 130px;
  height: 150px;
  margin-bottom: 10px;
  align-self: center;
`;

const Title = styled.Text`
  font-size: 18px;
  color: #ffffff;
  margin-bottom: 10px;
`;

const Description = styled.Text`
  font-size: 14px;
  color: #ffffff;
  text-align: center;
  margin-bottom: 20px;
`;

const InputContainer = styled.View`
  width: 100%;
  margin-bottom: 53px;
`;

const GoBackButton = styled.TouchableOpacity`
  margin-top: 93px;
  background-color: transparent;
`;

const GoBackText = styled.Text`
  text-align: center;
  font-size: 14px;
  color: #ffffff;
`;

const ChameleonLogoSource = require('../Assets/chameleon.png');

class ForgotPassword extends Component {
  state = {};
  render() {
    const { navigation } = this.props;

    return (
      <SuperContainer>
        <MainContainer width={width}>
          <StatusBar barStyle="light-content" backgroundColor="#0000003c" translucent />
          <Image source={ChameleonLogoSource} resizeMode="contain" />
          <Title>Forgot Password</Title>
          <Description>Enter your email and a password reset link will the sent to you</Description>
          <InputContainer>
            <Input
              placeholder="Email"
              onChangeText={(text) => {}}
              value={this.state.email}
              keyboardType="email-address"
            />
          </InputContainer>
          <Button text="Send" onPress={() => {}} />
          <GoBackButton
            onPress={() => {
              navigation.goBack();
            }}
          >
            <GoBackText>Go Back</GoBackText>
          </GoBackButton>
        </MainContainer>
      </SuperContainer>
    );
  }
}

export default ForgotPassword;
