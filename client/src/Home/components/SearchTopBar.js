import React from 'react';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/FontAwesome';

import IconButton from '../../components/IconButton';

const MainContainer = styled.View`
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  height: 54px;
  padding: 0 16px;
  flex-direction: row;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.85);
`;

const SearchBarContainer = styled.View`
  height: 38px;
  background-color: rgba(0, 0, 0, 0.2);
  border-radius: 19px;
  flex: 1;
  margin-right: 16px;
  padding: 0 14px;
  flex-direction: row;
  align-items: center;
`;

const SearchBar = styled.TextInput`
  margin-left: 14px;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  height: 100%;
  width: 100%;
  flex: 1;
  padding-vertical: 0px;
  color: rgb(255, 255, 255);
`;

class SearchTopBar extends React.Component {
  state = {};

  render() {
    return (
      <MainContainer>
        <SearchBarContainer>
          <Icon name="search" color="rgba(255, 255, 255, 1)" size={20} />
          <SearchBar
            placeholder="Search Friends and Chats"
            placeholderTextColor="rgba(255, 255, 255, 0.7)"
            underlineColorAndroid="transparent"
          />
        </SearchBarContainer>
        <IconButton name="plus" color="rgba(55, 202, 195, 0.87)" />
      </MainContainer>
    );
  }
}

export default SearchTopBar;
