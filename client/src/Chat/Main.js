import React from 'react';
import styled from 'styled-components/native';

import TopBar from '../Home/components/TopBar';

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
