// @flow

import { StackNavigator } from 'react-navigation';

import Login from './Login';

const OnboardingStack = StackNavigator({
  Login: {
    screen: Login,
  },
}, {
  navigationOptions: {
    header: null,
  },
});

export default OnboardingStack;
