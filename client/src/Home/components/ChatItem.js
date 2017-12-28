import React from 'react';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';

import ProfileInfo from '../../components/ProfileInfo';

const ChatContainer = styled.View`
  height: 56px;
  padding: 0 16px;
  flex-direction: row;
  align-items: center;
`;

const ChatItem = ({
  chat: {
    name, online, profilePictureURL, minutes,
  },
}) => (
  <ChatContainer>
    <ProfileInfo
      name={name}
      online={online}
      profilePictureURL={profilePictureURL}
      minutes={minutes}
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
  }),
};

export default ChatItem;
