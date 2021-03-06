import React from 'react';
import styled from 'styled-components/native';
import IconButton from '../../components/IconButton';
import ProfileInfo from '../../components/ProfileInfo';

import screenDimensions from '../../utils/screenDimensions';
import CustomStatusBar from '../../components/CustomStatusBar';

const TopBarContainer = styled.View`
  height: ${props => props.statusBarHeight + 56};
  background-color: #ffffff;
  padding-top: ${props => props.statusBarHeight};
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-left: 16px;
  padding-right: 8px;
  elevation: 2;
`;

const UserDetails = {
  name: 'Waquid VP',
  online: true,
  profilePictureURL:
    'https://avatars3.githubusercontent.com/u/15846228?s=400&u=a882c5df4fd991ee0d97ac6be4b1887fd580dad5&v=4',
  minutes: 6547,
};

class TopBar extends React.Component {
  state = {};

  render() {
    const {
      name, online, profilePictureURL, minutes,
    } = UserDetails;

    const { navigation } = this.props;

    return (
      <TopBarContainer statusBarHeight={screenDimensions.statusBarHeight}>
        <CustomStatusBar />
        <ProfileInfo
          name={name}
          online={online}
          profilePictureURL={profilePictureURL}
          minutes={minutes}
        />
        <IconButton
          name="cog"
          color="rgba(0, 0, 0, 0.87)"
          size={24}
          onPress={() => navigation.navigate('Settings')}
        />
      </TopBarContainer>
    );
  }
}

export default TopBar;
