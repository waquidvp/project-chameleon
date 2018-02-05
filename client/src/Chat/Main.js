import React from 'react';
import { Platform, Text } from 'react-native';
import styled from 'styled-components/native';

import ProfileInfo from '../components/ProfileInfo';
import screenDimensions from '../utils/screenDimensions';

const KeyboardOffset = Platform.select({
  ios: screenDimensions.bottomBarHeight + 36,
  android: 40,
});

const MainContainer = styled.View`
  flex: 1;
`;

const ChatsPanelContainer = styled.KeyboardAvoidingView`
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

const ChatList = styled.FlatList`
  flex: 1;
`;

const ChatFooter = styled.View`
  margin-bottom: ${screenDimensions.bottomBarHeight + 40};
  height: 40px;
  width: 100%;
  flex-direction: row;
`;

const ChatInput = styled.TextInput`
  flex: 1;
`;

const ChatSpacer = styled.View`
  height: 8px;
`;

const MainRowContainer = styled.View`
  padding: 0 8px;
  width: 100%;
  flex-direction: row;
  justify-content: ${props => (props.sent ? 'flex-end' : 'flex-start')};
`;

const ChatBubbleContainer = styled.View`
  border-radius: 15px;
  max-width: 75%;
  background-color: ${props => (props.sent ? 'rgb(55, 202, 195)' : '#E0E0E0')};
  padding: 10px 13px;
  justify-content: center;
`;

const ChatText = styled.Text`
  color: ${props => (props.sent ? 'white' : 'black')};
`;

const ChatBubble = ({ chat }) => (
  <MainRowContainer sent={chat.id === 2354}>
    <ChatBubbleContainer sent={chat.id === 2354}>
      <ChatText sent={chat.id === 2354}>{chat.message}</ChatText>
    </ChatBubbleContainer>
  </MainRowContainer>
);

const chatData = [
  { id: 2354, message: 'Hey There, Hey There, Hey There' },
  { id: 2435, message: 'Hello, Hey There' },
  { id: 2354, message: 'Hey There, Hey ThereHey ThereHey ThereHey ThereHey There' },
  { id: 2435, message: 'Hey There, Hey ThereHey ThereHey ThereHey ThereHey There' },
  { id: 2354, message: 'Hey There' },
  { id: 2435, message: 'Hello' },
  { id: 2354, message: 'Hey There' },
  { id: 2435, message: 'Hello' },
  { id: 2354, message: 'Hey There' },
  { id: 2435, message: 'Hello' },
  { id: 2435, message: 'Hello, Hey There' },
  { id: 2354, message: 'Hey There, Hey ThereHey ThereHey ThereHey ThereHey There' },
  { id: 2435, message: 'Hey There, Hey ThereHey ThereHey ThereHey ThereHey There' },
  { id: 2354, message: 'Hey There' },
  { id: 2435, message: 'Hello, Hey There' },
  { id: 2354, message: 'Hey There, Hey ThereHey ThereHey ThereHey ThereHey There' },
  { id: 2435, message: 'Hey There, Hey ThereHey ThereHey ThereHey ThereHey There' },
  { id: 2354, message: 'Hey There' },
];

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
        <ChatsPanelContainer keyboardVerticalOffset={KeyboardOffset} behavior="padding">
          <ChatsPanel>
            <ChatList
              data={chatData}
              renderItem={({ item }) => <ChatBubble chat={item} />}
              keyExtractor={item => item.id}
              ItemSeparatorComponent={ChatSpacer}
              ListHeaderComponent={ChatSpacer}
              ListFooterComponent={ChatSpacer}
              inverted
            />
            <ChatFooter>
              <ChatInput />
            </ChatFooter>
          </ChatsPanel>
        </ChatsPanelContainer>
      </MainContainer>
    );
  }
}

export default Chat;
