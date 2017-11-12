// @flow

import React from 'react';
import styled from 'styled-components/native';

const MainContainer = styled.View`
  flex: 1;
  background: green;
`;

export default class Home extends React.Component {
  constructor() {
    super();

    this.state = {

    };
  }

  render() {
    return (
      <MainContainer />
    );
  }
}
