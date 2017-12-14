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
    cardStyle: {
      backgroundColor: '#37cac3b4',
    },
    navigationOptions: {
      header: null,
    },
  },
);

export default OnboardingStack;
