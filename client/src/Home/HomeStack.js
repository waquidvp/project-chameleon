import { StackNavigator } from 'react-navigation';

import Chats from './Chats';
import Chat from '../Chat/Main';

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
      header: null,
    },
    cardStyle: {
      backgroundColor: 'rgba(55, 202, 195, 0.1)',
    },
    transitionConfig: () => ({
      containerStyle: {
        backgroundColor: 'rgba(55, 202, 195, 0.1)',
      },
    }),
  },
);

export default HomeStack;
