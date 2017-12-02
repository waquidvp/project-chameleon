import React, { Component } from 'react';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';

const Touch = styled.TouchableOpacity`
  width: 300px;
  height: 38px;
  border-radius: 20;
  align-self: center;
  align-items: center;
  justify-content: center;
  background-color: #ffffff;
`;

const ButtonText = styled.Text`
  font-size: 16;
  color: #37CAC3;
`;


export default class Input extends Component {
  static propTypes = {
    text: PropTypes.string.isRequired,
  };

  static defaultProps = {

  };

  constructor() {
    super();

    this.state = {

    };
  }

  render() {
    const {
      text,
    } = this.props;

    return (
      <Touch onPress={() => this.handleLogin()}>
        <ButtonText>
          {text}
        </ButtonText>
      </Touch>
    );
  }
}
