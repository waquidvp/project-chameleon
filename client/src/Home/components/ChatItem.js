import React from 'react';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';

import ProfileInfo from '../../components/ProfileInfo';
import Touchable from '../../components/Touchable';

const ChatContainer = styled(Touchable)`
  height: 56px;
  padding: 0 16px;
  flex-direction: row;
  align-items: center;
  background-color: #ffffff;
`;

const ChatItem = ({
  chat: {
    name, online, profilePictureURL, minutes, chatPreview,
  }, onPress,
}) => (
  <ChatContainer list onPress={onPress}>
    <ProfileInfo
      name={name}
      online={online}
      profilePictureURL={profilePictureURL}
      minutes={minutes}
      chatPreview={chatPreview}
    />
  </ChatContainer>
);

ChatItem.propTypes = {
  chat: PropTypes.shape({
    key: PropTypes.number.isRequired,
    profilePictureURL: PropTypes.string.isRequired,
    online: PropTypes.bool.isRequired,
    name: PropTypes.string.isRequired,
    minutes: PropTypes.number.isRequired,
    chatPreview: PropTypes.string,
  }).isRequired,
  onPress: PropTypes.func.isRequired,
};

export default ChatItem;
