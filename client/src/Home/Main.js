import React from 'react';
import styled from 'styled-components/native';

import PullUpPanel from './PullUpPanel';
import HomeStack from './HomeStack';
import CustomStatusBar from '../components/CustomStatusBar';

const MainContainer = styled.View`
  flex: 1;
  background-color: rgba(55, 202, 195, 0.2);
`;

class Main extends React.Component {
  state = {};
  render() {
    const { changeLoginState } = this.props;

    return (
      <MainContainer>
        <CustomStatusBar />
        <HomeStack screenProps={{ changeLoginState }} />
        <PullUpPanel />
      </MainContainer>
    );
  }
}

export default Main;
