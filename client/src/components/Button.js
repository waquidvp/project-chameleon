import React, { Component } from 'react';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';
import PlatfromTouchable from 'react-native-platform-touchable';
import LinearGradient from 'react-native-linear-gradient';

const Touchable = ({ style, children, ...props }) => (
  <PlatfromTouchable
    style={style}
    {...props}
  >
    {children}
  </PlatfromTouchable>
);

const Gradient = ({ style, children, ...props }) => (
  <LinearGradient
    style={style}
    {...props}
  >
    {children}
  </LinearGradient>
);

const TouchContainer = styled.View`
  width: 100%;
  height: 38px;
  border-radius: 19px;
`;

const Touch = styled(Touchable)`
  height: 38px;
  border-radius: 19px;
  align-items: center;
  justify-content: center;
  background-color: ${props => props.backgroundColor};
`;

const GradientBackground = styled(Gradient)`
  width: 100%;
  height: 38px;
  border-radius: 19px;
  align-items: center;
  justify-content: center;
`;

const ButtonText = styled.Text`
  font-size: 16;
  color: #37CAC3;
`;

const View = styled.View`
  align-items: center;
  justify-content: center;
`;

export default class Button extends Component {
  static propTypes = {
    text: PropTypes.string,
    children: PropTypes.node,
    onPress: PropTypes.func.isRequired,
    backgroundColor: PropTypes.string,
    gradient: PropTypes.arrayOf(PropTypes.string),
  };

  static defaultProps = {
    backgroundColor: '#ffffff',
  }

  constructor() {
    super();

    this.state = {

    };
  }

  render() {
    const {
      text,
      children,
      onPress,
      backgroundColor,
      gradient,
    } = this.props;


    if (gradient) {
      return (
        <TouchContainer>
          <Touch
            onPress={() => onPress()}
            foreground={PlatfromTouchable.SelectableBackgroundBorderless()}
            backgroundColor={backgroundColor}
          >
            <GradientBackground
              colors={gradient}
              end={{ x: 1, y: 1 }}
            >
              { text ?
                <ButtonText>
                  {text}
                </ButtonText>
              :
                <View>
                  {children}
                </View>
              }
            </GradientBackground>
          </Touch>
        </TouchContainer>
      );
    }

    return (
      <TouchContainer>
        <Touch
          onPress={() => onPress()}
          background={PlatfromTouchable.SelectableBackgroundBorderless()}
          backgroundColor={backgroundColor}
        >
          { text ?
            <ButtonText>
              {text}
            </ButtonText>
          :
            <View>
              {children}
            </View>
          }
        </Touch>
      </TouchContainer>
    );
  }
}
