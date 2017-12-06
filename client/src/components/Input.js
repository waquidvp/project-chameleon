import React, { Component } from 'react';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';
import {
  Animated,
} from 'react-native';

const TextInputContainer = styled.View`
  width: 100%;
  height: 38px;
  padding: 0 14px;
  margin: 5px 0;
  border-radius: 19;
  background-color: ${props => props.backgroundColor};
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
    selectionColor: PropTypes.string,
    opacityValue: PropTypes.number,
    errorOpacityValue: PropTypes.number,
    autoCapitalize: PropTypes.string,
    keyboardType: PropTypes.string,
    backgroundColor: PropTypes.string,
  };

  static defaultProps = {
    secureTextEntry: false,
    placeholderTextColor: '#ffffff',
    errorText: null,
    editable: true,
    selectionColor: '#ffffff99',
    autoCapitalize: 'none',
    keyboardType: 'default',
    backgroundColor: '#00000020',
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
      selectionColor,
      opacityValue,
      errorOpacityValue,
      autoCapitalize,
      keyboardType,
      backgroundColor,
    } = this.props;

    return (
      <Animated.View style={{ opacity: opacityValue }}>
        <TextInputContainer backgroundColor={backgroundColor} >
          <TextInput
            placeholder={placeholder}
            placeholderTextColor={placeholderTextColor}
            onChangeText={onChangeText}
            value={value}
            secureTextEntry={secureTextEntry}
            underlineColorAndroid="transparent"
            editable={editable}
            numberOfLines={1}
            selectionColor={selectionColor}
            autoCapitalize={autoCapitalize}
            keyboardType={keyboardType}
          />
          <Animated.View style={{ opacity: errorOpacityValue }}>
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
