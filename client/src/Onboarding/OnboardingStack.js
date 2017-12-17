// @flow

import { StackNavigator } from 'react-navigation';

import Login from './Login';
import Register from './Register';
import Confirm from './Confirm';
import ForgotPassword from './ForgotPassword';

const OnboardingStack = StackNavigator(
  {
    Login: {
      screen: Login,
    },
    Register: {
      screen: Register,
    },
    Confirm: {
      screen: Confirm,
    },
    ForgotPassword: {
      screen: ForgotPassword,
    },
  },
  {
    navigationOptions: {
      header: null,
    },
  },
);

export default OnboardingStack;
