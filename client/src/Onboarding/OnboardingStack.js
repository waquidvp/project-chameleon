// @flow

import { StackNavigator } from 'react-navigation';

import Login from './Login';
import SignUp from './SignUp';

const OnboardingStack = StackNavigator({
  Login: {
    screen: Login,
  },
  SignUp: {
    screen: SignUp,
  },
}, {
  navigationOptions: {
    header: null,
  },
});

export default OnboardingStack;
