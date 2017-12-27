// @flow

import React from 'react';
import { StatusBar } from 'react-native';
import styled from 'styled-components/native';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import Button from '../components/Button';
import { screenDimensions } from '../utils/screenDimensions';
import PullUpPanel from './PullUpPanel';

const MainContainer = styled.View`
  flex: 1;
  background-color: rgba(55, 202, 195, 0.2);
  padding-top: ${props => props.statusBarHeight};
`;

const View = styled.View``;

const Text = styled.Text``;

class Home extends React.Component {
  state = {};

  render() {
    const { changeLoginState } = this.props.screenProps;
    const { currentUser } = this.props.data;

    return (
      <MainContainer statusBarHeight={screenDimensions.statusBarHeight}>
        <StatusBar barStyle="light-content" backgroundColor="#0000003c" translucent />
        <Button text="Sign Out" onPress={() => changeLoginState(false)} />
        {currentUser && (
          <View>
            <Text>{currentUser._id}</Text>
            <Text>{currentUser.email}</Text>
          </View>
        )}
        <PullUpPanel />
      </MainContainer>
    );
  }
}

export default graphql(gql`
  query User {
    currentUser {
      _id
      email
    }
  }
`)(Home);
