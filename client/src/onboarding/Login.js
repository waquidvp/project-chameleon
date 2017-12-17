// @flow

import React from 'react';
import { StatusBar, Animated, Easing, Dimensions } from 'react-native';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';

import Input from '../components/Input';
import Button from '../components/Button';

const { width } = Dimensions.get('window');

const MainContainer = styled.View`
  justify-content: center;
  align-items: center;
  width: ${props => props.width - 40};
  max-width: 325px;
`;

const Image = styled.Image`
  width: 130px;
  height: 150px;
  align-self: center;
`;

const SelectorMainContainer = styled.View`
  flex-direction: row;
`;

const SelectorContainer = styled.View`
  width: 125px;
`;

const AnimatedSelectorContainer = Animated.createAnimatedComponent(SelectorContainer);

const SelectorTouch = styled.TouchableWithoutFeedback``;

const Selector = styled.View`
  align-items: center;
  height: 30px;
`;

const SelectorText = styled.Text`
  color: #ffffff;
  width: 75px;
  text-align: center;
  font-size: 18px;
`;

const Slider = styled.View`
  width: 75px;
  border-width: 1px;
  border-radius: 1px;
  align-self: center;
  border-color: #ffffff;
`;

const AnimatedSlider = Animated.createAnimatedComponent(Slider);

const InputContainer = styled.View`
  padding-top: 20px;
  padding-bottom: 5px;
  width: 100%;
`;

const ButtonText = styled.Text`
  font-size: 16;
  color: #37cac3;
  position: absolute;
`;

const AnimatedButtonText = Animated.createAnimatedComponent(ButtonText);

const OrContainer = styled.View`
  width: 100%;
  height: 20px;
  margin: 15px;
  flex-direction: row;
`;

const OrLine = styled.View`
  flex: 6;
  height: 9px;
  border-bottom-width: 1.5px;
  border-bottom-color: #ffffff88;
`;

const OrTextContainer = styled.View`
  flex: 1;
  height: 15px;
  padding: 6px;
  justify-content: center;
  align-items: center;
`;

const OrText = styled.Text`
  color: #ffffff88;
`;

const ContinueWithFacebookText = styled.Text`
  color: #ffffff;
  background-color: #ffffff00;
`;

const ForgottenPasswordButton = styled.TouchableOpacity`
  padding-top: 40px;
  align-self: center;
`;

const AnimatedForgottenPasswordButton = Animated.createAnimatedComponent(ForgottenPasswordButton);

const ForgottenPasswordText = styled.Text`
  text-align: center;
  font-size: 14px;
  color: #ffffff;
`;

const OrSeperator = () => (
  <OrContainer>
    <OrLine />
    <OrTextContainer>
      <OrText> or </OrText>
    </OrTextContainer>
    <OrLine />
  </OrContainer>
);

const ChameleonLogoSource = require('../Assets/chameleon.png');

class Login extends React.Component {
  static propTypes = {
    screenProps: PropTypes.shape({
      loginSignupError: PropTypes.string.isRequired,
      handleLogin: PropTypes.func.isRequired,
      handleLoginFb: PropTypes.func.isRequired,
      handleSignup: PropTypes.func.isRequired,
      setEmail: PropTypes.func.isRequired,
      setPassword: PropTypes.func.isRequired,
      setConfirmPassword: PropTypes.func.isRequired,
    }),
  };

  state = {
    editable: false,
    mode: true,
    forgottenDisabled: false,
    opacityValue: new Animated.Value(0),
    forgottenOpacityValue: new Animated.Value(1),
    sliderValue: new Animated.Value(125),
    selectorLoginValue: new Animated.Value(1),
    selectorSignUpValue: new Animated.Value(0.25),
  };

  handleSelectLogin = () => {
    const dura = 200;
    const ease = Easing.linear;

    this.setState({ editable: false });
    this.setState({ forgottenDisabled: false });
    this.setState({ mode: true });

    Animated.parallel([
      Animated.timing(this.state.sliderValue, {
        toValue: 125,
        duration: dura,
        easing: ease,
      }),
      Animated.timing(this.state.opacityValue, {
        toValue: 0,
        duration: dura,
        easing: ease,
      }),
      Animated.timing(this.state.forgottenOpacityValue, {
        toValue: 1,
        duration: dura,
        easing: ease,
      }),
      Animated.timing(this.state.selectorLoginValue, {
        toValue: 1,
        duration: dura,
        easing: ease,
      }),
      Animated.timing(this.state.selectorSignUpValue, {
        toValue: 0.5,
        duration: dura,
        easing: ease,
      }),
    ]).start();
  };

  handleSelectSignup = () => {
    const dura = 200;
    const ease = Easing.linear;

    this.setState({ editable: true });
    this.setState({ forgottenDisabled: true });
    this.setState({ mode: false });

    Animated.parallel([
      Animated.timing(this.state.sliderValue, {
        toValue: -125,
        duration: dura,
        easing: ease,
      }),
      Animated.timing(this.state.opacityValue, {
        toValue: 1,
        duration: dura,
        easing: ease,
      }),
      Animated.timing(this.state.forgottenOpacityValue, {
        toValue: 0,
        duration: dura,
        easing: ease,
      }),
      Animated.timing(this.state.selectorLoginValue, {
        toValue: 0.5,
        duration: 0,
        easing: ease,
      }),
      Animated.timing(this.state.selectorSignUpValue, {
        toValue: 1,
        duration: 0,
        easing: ease,
      }),
    ]).start();
  };

  handleLoginSignupPress = () => {
    if (this.state.mode) {
      this.props.screenProps.handleLogin();
    } else {
      this.props.screenProps.handleSignup();
    }
  };

  render() {
    const { navigation } = this.props;
    const {
      loginSignupError,
      handleLoginFb,
      setEmail,
      setPassword,
      setConfirmPassword,
    } = this.props.screenProps;

    return (
      <MainContainer width={width}>
        <StatusBar barStyle="light-content" backgroundColor="#0000003c" translucent />
        <Image source={ChameleonLogoSource} resizeMode="contain" />

        <SelectorMainContainer>
          <AnimatedSelectorContainer style={{ opacity: this.state.selectorLoginValue }}>
            <SelectorTouch onPress={() => this.handleSelectLogin()}>
              <Selector
                color="#ffffffff" //  #ffffff88 on Sign up
              >
                <SelectorText>Login</SelectorText>
              </Selector>
            </SelectorTouch>
          </AnimatedSelectorContainer>
          <AnimatedSelectorContainer style={{ opacity: this.state.selectorSignUpValue }}>
            <SelectorTouch onPress={() => this.handleSelectSignup()}>
              <Selector
                color="#ffffffff" //  #ffffffff on Sign up
              >
                <SelectorText>Sign Up</SelectorText>
              </Selector>
            </SelectorTouch>
          </AnimatedSelectorContainer>
        </SelectorMainContainer>

        <AnimatedSlider style={{ marginRight: this.state.sliderValue }} />

        <InputContainer>
          <Input
            placeholder="Email"
            onChangeText={(text) => {
              setEmail(text);
            }}
            value={this.state.email}
            keyboardType="email-address"
          />

          <Input
            placeholder="Password"
            onChangeText={(text) => {
              setPassword(text);
            }}
            value={this.state.password}
            secureTextEntry
          />

          <Input
            placeholder="Confirm Password"
            onChangeText={(text) => {
              setConfirmPassword(text);
            }}
            value={this.state.confirmPassword}
            secureTextEntry
            opacityValue={this.state.opacityValue}
            editable={this.state.editable}
          />
        </InputContainer>

        <Button
          onPress={() => {
            this.handleLoginSignupPress();
          }}
        >
          <AnimatedButtonText style={{ opacity: this.state.forgottenOpacityValue }}>
            Login
          </AnimatedButtonText>
          <AnimatedButtonText style={{ opacity: this.state.opacityValue }}>
            Sign Up
          </AnimatedButtonText>
        </Button>

        <OrSeperator />

        <Button
          onPress={() => {
            handleLoginFb();
          }}
          gradient={['#3B4694', '#405EA2', '#457CB3']}
        >
          <ContinueWithFacebookText>CONTINUE WITH FACEBOOK</ContinueWithFacebookText>
        </Button>

        <AnimatedForgottenPasswordButton
          style={{ opacity: this.state.forgottenOpacityValue }}
          disabled={this.state.forgottenDisabled}
        >
          <ForgottenPasswordText>Forgotten your password?</ForgottenPasswordText>
        </AnimatedForgottenPasswordButton>
      </MainContainer>
    );
  }
}

export default Login;
