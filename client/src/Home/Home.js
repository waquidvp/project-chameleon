// @flow

import React from 'react';
import { StatusBar } from 'react-native';
import styled from 'styled-components/native';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import Icon from 'react-native-vector-icons/FontAwesome';

import Button from '../components/Button';
import { screenDimensions } from '../utils/screenDimensions';
import PullUpPanel from './PullUpPanel';

const MainContainer = styled.View`
  flex: 1;
  background-color: rgba(55, 202, 195, 0.1);
`;

const TopBar = styled.View`
  height: ${props => props.statusBarHeight + 56};
  background-color: #ffffff;
  padding-top: ${props => props.statusBarHeight};
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-left: 16px;
  padding-right: 16px;
`;

const ProfileInfoContainer = styled.View`
  flex-direction: row;
  align-items: center;  
`;

const ProfilePictureContainer = styled.View`
  width: 44px;
  height: 44px;
  borderRadius: 22px;
  align-items: center;
  justify-content: center;
  background-color: rgba(55, 202, 195, 0.60);
`;

const UserInfoContainer = styled.View`
  padding-left: 14px;
`;

const UserName = styled.Text`
  font-size: 14px;
  font-weight: 500;
  color: #000000
`;

const ProfilePicture = styled.Image`
  width: 40px;
  height: 40px;
  borderRadius: 20px;
`;

const SeperatorBar = styled.View`
  height: 12px;
  width: 1px;
  background-color: rgba(0, 0, 0, 0.54);
  margin: 0 8px;
`;

const UserScore = styled.Text`
  font-size: 12px;
  font-weight: 500;
  color: rgba(0, 0, 0, 0.54)
`;

const IconButton = styled.View`

`;

const ChatsPanel = styled.View`
  flex: 1;
  background-color: #ffffff;
  margin-top: 8px;
  border-top-left-radius: 19;
  border-top-right-radius: 19;
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
        <StatusBar barStyle="dark-content" backgroundColor="#0000003c" translucent />
        <TopBar statusBarHeight={screenDimensions.statusBarHeight}>
          <ProfileInfoContainer>
            <ProfilePictureContainer>
              <ProfilePicture source={{ uri: 'https://avatars3.githubusercontent.com/u/15846228?s=400&u=a882c5df4fd991ee0d97ac6be4b1887fd580dad5&v=4' }} />
            </ProfilePictureContainer>
            <UserInfoContainer>
              <UserName>Waquid VP</UserName>
            </UserInfoContainer>
            <SeperatorBar />
            <UserScore>6585</UserScore>
          </ProfileInfoContainer>
          <IconButton>
            <Icon name="cog" color="rgba(0, 0, 0, 0.87)" size={20} />
          </IconButton>
        </TopBar>
        <ChatsPanel>
          <Button text="Sign Out" onPress={() => changeLoginState(false)} />
          {currentUser && (
            <View>
              <Text>{currentUser._id}</Text>
              <Text>{currentUser.email}</Text>
            </View>
          )}
        </ChatsPanel>
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
