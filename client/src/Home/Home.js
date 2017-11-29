// @flow

import React from 'react';
import styled from 'styled-components/native';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

const MainContainer = styled.View`
  flex: 1;
  background: green;
`;

const Button = styled.Button``;

const View = styled.View``;

const Text = styled.Text``;

class Home extends React.Component {
  constructor() {
    super();

    this.state = {

    };
  }

  render() {
    const { changeLoginState } = this.props.screenProps;
    const { currentUser } = this.props.data;

    return (
      <MainContainer>
        <Button
          title="Sign Out"
          onPress={() => changeLoginState(false)}
        />
        {
          currentUser &&
            <View>
              <Text>{ currentUser._id }</Text>
              <Text>{ currentUser.email }</Text>
            </View>
        }
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
