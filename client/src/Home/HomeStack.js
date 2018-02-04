import { Platform } from 'react-native';
import { StackNavigator } from 'react-navigation';

import Chats from './Chats';
import Chat from '../Chat/Main';

import screenDimensions from '../utils/screenDimensions';

const headerPadding = Platform.select({
  ios: 0,
  android: screenDimensions.statusBarHeight,
});

const HomeStack = StackNavigator(
  {
    Chats: {
      screen: Chats,
    },
    Chat: {
      screen: Chat,
    },
  },
  {
    navigationOptions: {
      headerStyle: {
        height: 56 + headerPadding,
        paddingTop: headerPadding,
        paddingLeft: 16,
        paddingRight: 8,
        backgroundColor: '#FFFFFF',
        borderBottomWidth: 0,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 2,
      },
    },
    cardStyle: {
      backgroundColor: 'rgba(0, 0, 0, 0)',
    },
    transitionConfig: () => ({
      containerStyle: {
        backgroundColor: 'rgba(0, 0, 0, 0)',
      },
    }),
  },
);

export default HomeStack;
