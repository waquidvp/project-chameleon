import React, { Component } from 'react';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';
import {
  Animated,
} from 'react-native';

const TextInputContainer = styled.View`
  width: 300px;
  height: 38px;
  padding-left: 14px;
  padding-right: 14px;
  margin-top: 5px;
  margin-bottom: 5px;
  align-self: center;
  border-radius: 20.5;
  background-color: #00000020;
`;

const TextInput = styled.TextInput`
  width: 100%;
  height: 100%;
  color: #ffffff;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  padding-vertical: 0px;
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
        <TextInputContainer>
          <TextInput
            placeholder={placeholder}
            placeholderTextColor={placeholderTextColor}
            onChangeText={onChangeText}
            value={value}
            secureTextEntry={secureTextEntry}
            underlineColorAndroid="transparent"
            editable={editable}
            numberOfLines={1}
          />
          <Animated.View style={{ opacity: this.props.errorOpacityValue }}>
            { errorText ?
              <ErrorText >{errorText}</ErrorText>
              :
              null
            }
          </Animated.View>
        </TextInputContainer>
      </Animated.View>
    );
  }
}
