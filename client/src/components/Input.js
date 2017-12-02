import React, { Component } from 'react';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';
import {
  Animated,
} from 'react-native';

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
    editable: PropTypes.bool,
  };

  static defaultProps = {
    secureTextEntry: false,
    placeholderTextColor: '#ffffff',
    errorText: null,
    editable: true,
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
      editable,
    } = this.props;

    return (
      <Animated.View style={{ opacity: this.props.opacityValue }}>
        <TextInput
          placeholder={placeholder}
          placeholderTextColor={placeholderTextColor}
          onChangeText={onChangeText}
          value={value}
          secureTextEntry={secureTextEntry}
          underlineColorAndroid="transparent"
          editable={editable}
        />
        <Animated.View style={{ opacity: this.props.errorOpacityValue }}>
          { errorText ?
            <ErrorText >{errorText}</ErrorText>
            :
            null
          }
        </Animated.View>
      </Animated.View>
    );
  }
}
