// @flow

import React, { Component } from 'react';
import styled from 'styled-components/native';

const MainContainer = styled.View`
  flex: 1;
`;

const Text = styled.Text`

`;

class ForgotPassword extends Component {
  state = {};
  render() {
    return (
      <MainContainer>
        <Text>Forgotten Password</Text>
      </MainContainer>
    );
  }
}

export default ForgotPassword;
