// @flow

import React from 'react';
import {
  StatusBar, Animated, Easing,
} from 'react-native';
import styled from 'styled-components/native';
import { LoginButton, AccessToken } from 'react-native-fbsdk';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';

import Input from '../components/Input';
import BlurredCamera from '../components/BlurredCamera';

const View = styled.View`
  flex: 1;
`;

const SuperContainer = styled.View`
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
`;

const MainContainer = styled.ScrollView`
  flex: 1;
  paddingTop: 40px;
  background: #37CAC3B4;
`;

const Image = styled.Image`
  width: 130px;
  height: 130px;
  align-self: center;
`;

const SelectorMainContainer = styled.View`
  align-self: center;
  flex-direction: row;
`;

const SelectorContainer = styled.View`
  width: 125px;
`;

const AnimatedSelectorContainer = Animated.createAnimatedComponent(SelectorContainer);

const SelectorTouch = styled.TouchableWithoutFeedback`

`;

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
  height: 0px;
  border-width: 2px;
  border-radius: 2px;
  align-self: center;
  border-color: #ffffff;
`;

const AnimatedSlider = Animated.createAnimatedComponent(Slider);

const InputContainer = styled.View`
  padding-top: 20px;
`;


const ButtonText = styled.Text`
  font-size: 16;
  color: #37CAC3;
`;

const OrContainer = styled.View`
  width:324px;
  height:15px;
  margin: 20px;
  align-self: center;
  flex-direction: row;
`;

const OrLine = styled.View`
  width: 150px;
  height :8.5px;
  border-bottom-width: 1.5px;
  border-bottom-color: #ffffff88;
`;

const OrTextContainer = styled.View`
  height:15px;
  padding:6px;
  justify-content:center;
`;

const OrText = styled.Text`
  color: #ffffff88;
`;

const ButtonContainer = styled.View`
  width: 300px;
  height: 38px;
  border-radius: 20;
  align-self: center;
  align-items: center;
  justify-content: center;
  background-color: #ffffff;
`;

const Touch = styled.TouchableOpacity`
  width: 300px;
  height: 38px;
  border-radius: 20;
  align-self: center;
  align-items: center;
  justify-content: center;
  background-color: #ffffff;
`;
const AnimatedTouch = Animated.createAnimatedComponent(Touch)

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
  static navigationOptions = {
    title: 'Login',
  }

  constructor() {
    super();

    this.state = {
      email: '',
      password: '',
      confirmPassword: '',
      emailError: 'Invalid email',
      passwordError: 'Incorrect password',
      confirmPasswordError: 'Passwords do not match',
      opacityValue: new Animated.Value(0),
      translationValue: new Animated.Value(200),
      sliderValue: new Animated.Value(125),
      selectorLoginValue: new Animated.Value(1),
      selectorSignUpValue: new Animated.Value(0.25),
      errorOpacityValue: new Animated.Value(0),
      editable: false,
    };
  }

  handleSelectLogin = () => {
    const dura = 200;
    const ease = Easing.linear;

    this.setState({ editable: false });

    Animated.sequence([
      Animated.parallel([
        Animated.timing(
          this.state.sliderValue,
          {
            toValue: 125,
            duration: dura,
            easing: ease,
          },
        ),
        Animated.timing(
          this.state.opacityValue,
          {
            toValue: 0,
            duration: dura,
            easing: ease,
          },
        ),
        Animated.timing(
          this.state.selectorLoginValue,
          {
            toValue: 1,
            duration: dura,
            easing: ease,
          },
        ),
        Animated.timing(
          this.state.selectorSignUpValue,
          {
            toValue: 0.5,
            duration: dura,
            easing: ease,
          },
        ),
      ]),
      Animated.timing(
        this.state.translationValue,
        {
          toValue: 200,
          duration: 0,
          easing: ease,
        },
      ),
    ]).start();
  }

  handleSelectSignup = () => {
    const dura = 200;
    const ease = Easing.linear;

    this.setState({ editable: true });

    Animated.sequence([
      Animated.timing(
        this.state.translationValue,
        {
          toValue: 0,
          duration: 0,
          easing: ease,
        },
      ),
      Animated.parallel([
        Animated.timing(
          this.state.sliderValue,
          {
            toValue: -125,
            duration: dura,
            easing: ease,
          },
        ),
        Animated.timing(
          this.state.opacityValue,
          {
            toValue: 1,
            duration: dura,
            easing: ease,
          },
        ),
        Animated.timing(
          this.state.selectorLoginValue,
          {
            toValue: 0.5,
            duration: dura,
            easing: ease,
          },
        ),
        Animated.timing(
          this.state.selectorSignUpValue,
          {
            toValue: 1,
            duration: dura,
            easing: ease,
          },
        ),
      ]),
    ]).start();
  }

  handleSubmit = () => {
    const { email, password } = this.state;

    this.props.login(email, password)
      .then(({ data }) => {
        this.props.screenProps.changeLoginState(true, data.login.jwt);
      })
      .catch((error) => {
        console.warn(error);
        if (/email/i.test(error.message)) {
          this.setState({ emailError: error.message });
        }
        if (/password/i.test(error.message)) {
          this.setState({ passwordError: error.message });
        }
      });
  }

  handleLoginFb = (fbAccessToken) => {
    this.props.loginfb(fbAccessToken)
      .then(({ data }) => {
        this.props.screenProps.changeLoginState(true, data.loginfb.jwt);
      });
  }

  render() {
    const { navigation } = this.props;

    return (
      <View>
        <BlurredCamera />
        <SuperContainer>
          <MainContainer keyboardShouldPersistTaps="never" scrollEnabled={false}>
            <StatusBar barStyle="light-content" setBackgroundColor="#000000" />
            <Image source={ChameleonLogoSource} resizeMode="contain" />
            <SelectorMainContainer>
              <AnimatedSelectorContainer style={{ opacity: this.state.selectorLoginValue }}>
                <SelectorTouch
                  onPress={() => this.handleSelectLogin()}
                >
                  <Selector
                    color="#ffffffff" //  #ffffff88 on Sign up
                  >
                    <SelectorText>Login</SelectorText>
                  </Selector>
                </SelectorTouch>
              </AnimatedSelectorContainer>
              <AnimatedSelectorContainer style={{ opacity: this.state.selectorSignUpValue }}>
                <SelectorTouch
                  onPress={() => this.handleSelectSignup()}
                >
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
                  this.setState({ email: text });
                }}
                value={this.state.email}
                errorText={this.state.emailError}
                errorOpacityValue={this.state.errorOpacityValue}
              />

              <Input
                placeholder="Password"
                onChangeText={(text) => {
                  this.setState({ password: text });
                }}
                value={this.state.password}
                secureTextEntry
                errorText={this.state.passwordError}
                errorOpacityValue={this.state.errorOpacityValue}
              />

              <Input // hide on login
                placeholder="Confirm Password"
                onChangeText={(text) => {
                  this.setState({ confirmPassword: text });
                }}
                value={this.state.confirmPassword}
                secureTextEntry
                errorText={this.state.confirmPasswordError}
                opacityValue={this.state.opacityValue}
                editable={this.state.editable}
                errorOpacityValue={this.state.errorOpacityValue}
              />
            </InputContainer>

            <ButtonContainer>
              <AnimatedTouch style={{ position: 'absolute' }} onPress={() => this.handleLogin()}>
                <ButtonText>
                  Login
                </ButtonText>
              </AnimatedTouch>

              <AnimatedTouch
                style={{ position: 'absolute', left: this.state.translationValue, opacity: this.state.opacityValue }}
                onPress={() => this.handleSignup()}
              >
                <ButtonText>
                  Sign Up
                </ButtonText>
              </AnimatedTouch>
            </ButtonContainer>

            <OrSeperator />

            <LoginButton
              readPermissions={['email', 'public_profile']}
              onLoginFinished={
                (error, result) => {
                  if (error) {
                    console.warn(`login has error: ${result.error}`);
                  } else if (result.isCancelled) {
                    console.warn('login is cancelled.');
                  } else {
                    AccessToken.getCurrentAccessToken()
                      .then((fbAccessToken) => {
                        this.handleLoginFb(fbAccessToken.accessToken);
                      });
                  }
                }
              }
              onLogoutFinished={() => console.warn('logout.')}
            />
          </MainContainer>
        </SuperContainer>
      </View>
    );
  }
}

const loginMutation = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      _id
      email
      jwt
    }
  }
`;

const loginfbMutation = gql`
  mutation loginfb($fbAccessToken: String!) {
    loginfb(fbAccessToken: $fbAccessToken) {
      _id
      email
      jwt
    }
  }
`;

export default compose(
  graphql(
    loginMutation,
    {
      props: ({ mutate }) => ({
        login: (email, password) => mutate({ variables: { email, password } }),
      }),
    },
  ),
  graphql(
    loginfbMutation,
    {
      props: ({ mutate }) => ({
        loginfb: fbAccessToken => mutate({ variables: { fbAccessToken } }),
      }),
    },
  ),
)(Login);
