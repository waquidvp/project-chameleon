import React, { Component } from 'react';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';

const View = styled.View``;

const TextInput = styled.TextInput`
  width: 300px;
  height: 38px;
  color: #ffffff;
  padding-left: 14;
  align-self: center;
  border-radius: 20.5;
  background-color: #00000020;
`;

const ErrorText = styled.Text`
  font-size: 12;
  color: #D75745;
  align-self: center;
`;

export default class Input extends Component {
  static propTypes = {
    placeholder: PropTypes.string.isRequired,
    onChangeText: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired,
    secureTextEntry: PropTypes.bool,
    placeholderTextColor: PropTypes.string,
    errorText: PropTypes.string,
  };

  static defaultProps = {
    secureTextEntry: false,
    placeholderTextColor: '#ffffff',
    errorText: null,
  };

  constructor() {
    super();

    this.state = {

    };
  }

  render() {
    const {
      placeholder,
      placeholderTextColor,
      onChangeText,
      value,
      secureTextEntry,
      errorText,
    } = this.props;

    return (
      <View>
        <TextInput
          placeholder={placeholder}
          placeholderTextColor={placeholderTextColor}
          onChangeText={onChangeText}
          value={value}
          secureTextEntry={secureTextEntry}
        />
        { errorText ?
          <ErrorText>{errorText}</ErrorText>
          :
          null
        }
      </View>
    );
  }
}
