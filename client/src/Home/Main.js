import React from 'react';
import styled from 'styled-components/native';

import PullUpPanel from './PullUpPanel';
import HomeStack from './HomeStack';

const MainContainer = styled.View`
  flex: 1;
`;

class Main extends React.Component {
  state = {};
  render() {
    const { changeLoginState } = this.props;

    return (
      <MainContainer>
        <HomeStack screenProps={{ changeLoginState }} />
        <PullUpPanel />
      </MainContainer>
    );
  }
}

export default Main;
