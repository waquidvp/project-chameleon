import React from 'react';
import styled from 'styled-components/native';

import TopBar from '../Home/components/TopBar';
import ProfileInfo from '../components/ProfileInfo';

const MainContainer = styled.View`
  flex: 1;
`;

const ChatsPanel = styled.View`
  flex: 1;
  background-color: #ffffff;
  margin-top: 8px;
  border-top-left-radius: 19;
  border-top-right-radius: 19;
  overflow: hidden;
  elevation: 1;
`;

class Chat extends React.Component {
  static navigationOptions = {
    headerLeft: (
      <ProfileInfo
        name="waquid"
        online
        profilePictureURL="https://randomuser.me/api/portraits/men/84.jpg"
        minutes={123}
      />
    ),
  };

  state = {};
  render() {
    return (
      <MainContainer>
        <TopBar />
        <ChatsPanel />
      </MainContainer>
    );
  }
}

export default Chat;
