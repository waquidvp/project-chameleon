// @flow

import React from 'react';
import { FlatList } from 'react-native';
import styled from 'styled-components/native';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import Button from '../components/Button';
import PullUpPanel from './PullUpPanel';
import TopBar from './components/TopBar';
import SearchTopBar from './components/SearchTopBar';
import ChatItem from './components/ChatItem';
import { screenDimensions } from '../utils/screenDimensions';

const MainContainer = styled.View`
  flex: 1;
  background-color: rgba(55, 202, 195, 0.1);
`;

const ChatsPanel = styled.View`
  flex: 1;
  background-color: #ffffff;
  margin-top: 8px;
  border-top-left-radius: 19;
  border-top-right-radius: 19;
  overflow: hidden;
`;

const Chats = styled.ScrollView`
  flex: 1;
  padding-top: 54px;
`;

const FooterSpacerComponent = styled.View`
  height: ${props => props.screenDimensions.bottomBarHeight + 56};
`;

const View = styled.View``;

const Text = styled.Text``;

const demoChats = [
  {
    key: 1,
    name: 'Danielle Crawford',
    online: false,
    profilePictureURL: 'https://randomuser.me/api/portraits/women/30.jpg',
    minutes: 5467,
  },
  {
    key: 2,
    name: 'Derrick Carpenter',
    online: true,
    profilePictureURL: 'https://randomuser.me/api/portraits/men/8.jpg',
    minutes: 2345,
  },
  {
    key: 3,
    name: 'Louella Soto',
    online: true,
    profilePictureURL: 'https://randomuser.me/api/portraits/women/63.jpg',
    minutes: 9845,
  },
  {
    key: 4,
    name: 'Shawn Rodriquez',
    online: false,
    profilePictureURL: 'https://randomuser.me/api/portraits/men/73.jpg',
    minutes: 4375,
  },
  {
    key: 5,
    name: 'Jacqueline Lucas',
    online: true,
    profilePictureURL: 'https://randomuser.me/api/portraits/women/2.jpg',
    minutes: 5343,
  },
  {
    key: 6,
    name: 'Evan Griffin',
    online: false,
    profilePictureURL: 'https://randomuser.me/api/portraits/men/39.jpg',
    minutes: 34543,
  },
  {
    key: 7,
    name: 'David Bell',
    online: true,
    profilePictureURL: 'https://randomuser.me/api/portraits/men/9.jpg',
    minutes: 534,
  },
  {
    key: 8,
    name: 'Nora Olson',
    online: false,
    profilePictureURL: 'https://randomuser.me/api/portraits/women/68.jpg',
    minutes: 8457,
  },
  {
    key: 9,
    name: 'Sharlene Young',
    online: true,
    profilePictureURL: 'https://randomuser.me/api/portraits/women/80.jpg',
    minutes: 9546,
  },
  {
    key: 10,
    name: 'Ray Vargas',
    online: false,
    profilePictureURL: 'https://randomuser.me/api/portraits/men/84.jpg',
    minutes: 7346,
  },
];

class Home extends React.Component {
  state = {};

  render() {
    const { changeLoginState } = this.props.screenProps;
    const { currentUser } = this.props.data;

    return (
      <MainContainer>
        <TopBar />
        <ChatsPanel>
          <Chats>
            <FlatList
              data={demoChats}
              renderItem={({ item }) => <ChatItem chat={item} />}
              ListFooterComponent={<FooterSpacerComponent screenDimensions={screenDimensions} />}
            />
            <Button text="Sign Out" onPress={() => changeLoginState(false)} />
            {currentUser && (
              <View>
                <Text>{currentUser._id}</Text>
                <Text>{currentUser.email}</Text>
              </View>
            )}
          </Chats>
          <SearchTopBar />
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
