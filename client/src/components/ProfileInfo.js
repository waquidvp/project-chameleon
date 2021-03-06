import React from 'react';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';

const ProfileInfoContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

const ProfilePictureContainer = styled.View`
  width: 44px;
  height: 44px;
  border-radius: 22px;
  align-items: center;
  justify-content: center;
  background-color: ${props =>
    (props.online === true ? 'rgba(55, 202, 195, 0.6)' : 'rgba(55, 202, 195, 0)')};
`;

const ColumnContainer = styled.View`
  flex-direction: column;
  padding-left: 14px;
`;

const MainInfoContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

const UserInfoContainer = styled.View``;

const Name = styled.Text`
  font-family: OpenSans-SemiBold;
  font-size: 14px;
  color: #000000;
`;

const ProfilePicture = styled.Image`
  width: 40px;
  height: 40px;
  border-radius: 20px;
`;

const SeperatorBar = styled.View`
  height: 12px;
  width: 1px;
  background-color: rgba(0, 0, 0, 0.54);
  margin: 0 8px;
`;

const Minutes = styled.Text`
  font-family: OpenSans-SemiBold;
  font-size: 12px;
  color: rgba(0, 0, 0, 0.54);
`;

const ChatPreview = styled.Text`
  margin-top: 2px;
  font-family: OpenSans-SemiBold;
  font-size: 13px;
  color: rgba(0, 0, 0, 0.38);
`;

const ProfileInfo = ({
  profilePictureURL, online, name, minutes, chatPreview,
}) => (
  <ProfileInfoContainer>
    <ProfilePictureContainer online={online}>
      <ProfilePicture
        source={{
          uri: profilePictureURL,
        }}
      />
    </ProfilePictureContainer>
    <ColumnContainer>
      <MainInfoContainer>
        <UserInfoContainer>
          <Name>{name}</Name>
        </UserInfoContainer>
        <SeperatorBar />
        <Minutes>{minutes}</Minutes>
      </MainInfoContainer>
      {chatPreview ? <ChatPreview>{chatPreview}</ChatPreview> : null}
    </ColumnContainer>
  </ProfileInfoContainer>
);

ProfileInfo.propTypes = {
  profilePictureURL: PropTypes.string.isRequired,
  online: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
  minutes: PropTypes.number.isRequired,
  chatPreview: PropTypes.string,
};

export default ProfileInfo;
