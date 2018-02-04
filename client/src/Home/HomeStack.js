import { StackNavigator } from 'react-navigation';

import Chats from './Chats';
import Chat from '../Chat/Main';

import screenDimensions from '../utils/screenDimensions';

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
        height: screenDimensions.statusBarHeight + 56,
        paddingTop: screenDimensions.statusBarHeight,
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
