import { StackNavigator } from 'react-navigation';

import Chats from './Chats';

const HomeStack = StackNavigator(
  {
    Chats: {
      screen: Chats,
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
