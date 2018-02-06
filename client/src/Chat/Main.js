import React from 'react';
import { Platform } from 'react-native';
import styled from 'styled-components/native';

import ProfileInfo from '../components/ProfileInfo';
import screenDimensions from '../utils/screenDimensions';
import IconButton from '../components/IconButton';

const keyboardOffset = Platform.select({
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

const ChatFooterContainer = styled.View`
  width: 100%;
  /* border-top-width: 1px;
  border-color: rgba(0, 0, 0, 0.12); */
  padding: 0 8px;
  padding-bottom: ${screenDimensions.bottomBarHeight + 40};
`;

const ChatFooter = styled.View`
  flex-direction: row;
  align-items: center;
`;

const FooterIconContainer = styled.View`
  padding: 0 4px;
`;

const ChatInput = styled.TextInput`
  flex: 1;
  margin: 4px 0;
  padding: 4px 12px;
  border-radius: 12px;
  background-color: rgba(0, 0, 0, 0.12);
  padding-vertical: 0px;
  font-size: 14px;
  color: black;
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
  justify-content: center;
`;

const ChatTextContainer = styled.View`
  padding: 10px 13px;
`;

const ChatText = styled.Text`
  color: ${props => (props.sent ? 'white' : 'black')};
`;

const ChatImageContainer = styled.View`
  width: 75%;
  border-radius: 12px;
  background-color: ${props => (props.sent ? 'rgb(55, 202, 195)' : '#E0E0E0')};
  max-height: 300px;
  padding: 4px 4px;
`;

const ChatImage = styled.Image`
  border-radius: 5px;
  width: 100%;
  aspect-ratio: 1.5;
`;

const ChatContent = ({ chat, sent = false }) => {
  if (chat.imgUrl) {
    return (
      <ChatImageContainer sent={sent}>
        <ChatImage source={{ uri: chat.imgUrl }} resizeMode="contain" />
      </ChatImageContainer>
    );
  }

  return (
    <ChatBubbleContainer sent={sent}>
      <ChatTextContainer>
        <ChatText sent={sent}>{chat.message}</ChatText>
      </ChatTextContainer>
    </ChatBubbleContainer>
  );
};

const ChatBubble = ({ chat }) => {
  if (chat.id === 2354) {
    return (
      <MainRowContainer sent>
        <ChatContent chat={chat} sent />
      </MainRowContainer>
    );
  }

  return (
    <MainRowContainer>
      <ChatContent chat={chat} />
    </MainRowContainer>
  );
};

const chatData = [
  { id: 2354, message: 'Hey There, Hey There, Hey There' },
  {
    id: 2354,
    imgUrl:
      'https://car-images.bauersecure.com/pagefiles/78105/450x300/01_a_class_044.jpg?quality=50',
  },
  { id: 2435, message: 'Hello, Hey There' },
  { id: 2354, message: 'Hey There, Hey ThereHey ThereHey ThereHey ThereHey There' },
  { id: 2435, message: 'Hey There, Hey ThereHey ThereHey ThereHey ThereHey There' },
  { id: 2354, message: 'Hey There' },
  { id: 2435, message: 'Hello' },
  {
    id: 2335,
    imgUrl:
      'https://car-images.bauersecure.com/pagefiles/78105/450x300/01_a_class_044.jpg?quality=50',
  },
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
        <ChatsPanelContainer keyboardVerticalOffset={keyboardOffset} behavior="height">
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
            <ChatFooterContainer>
              <ChatFooter>
                <FooterIconContainer>
                  <IconButton
                    name="microphone"
                    color="rgb(255, 255, 255)"
                    size={22}
                    backgroundColor="rgb(55, 202, 195)"
                  />
                </FooterIconContainer>
                <FooterIconContainer>
                  <IconButton
                    name="plus"
                    color="rgb(255, 255, 255)"
                    size={22}
                    backgroundColor="rgb(55, 202, 195)"
                  />
                </FooterIconContainer>
                <ChatInput
                  placeholder="Type a message..."
                  placeholderTextColor="rgba(0, 0, 0, 0.54)"
                  underlineColorAndroid="transparent"
                  multiline
                />
              </ChatFooter>
            </ChatFooterContainer>
          </ChatsPanel>
        </ChatsPanelContainer>
      </MainContainer>
    );
  }
}

export default Chat;
