import { StackNavigator } from 'react-navigation';

import Chats from './Chats';
import Chat from '../Chat/Main';

import screenDimensions from '../utils/screenDimensions';

console.warn(screenDimensions.statusBarHeight);

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
        height: 56,
        backgroundColor: '#FFFFFF',
        borderBottomWidth: 0,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
      },
    },
    cardStyle: {
      backgroundColor: 'rgba(55, 202, 195, 0.05)',
    },
    transitionConfig: () => ({
      containerStyle: {
        backgroundColor: 'rgba(55, 202, 195, 0.05)',
      },
    }),
  },
);

export default HomeStack;
