import React from 'react';
import styled from 'styled-components/native';

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
        name="Kovacs"
        online
        profilePictureURL="https://randomuser.me/api/portraits/men/86.jpg"
        minutes={2354}
      />
    ),
  };

  state = {};
  render() {
    return (
      <MainContainer>
        <ChatsPanel />
      </MainContainer>
    );
  }
}

export default Chat;
