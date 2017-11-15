// @flow

import { AsyncStorage } from 'react-native';

let token;

export const signIn = (jwt) => {
  token = jwt;
  return AsyncStorage.setItem('jwt', jwt);
};

export const signOut = () => {
  token = undefined;
  return AsyncStorage.removeItem('jwt');
};

export const getToken = async () => {
  if (token) {
    return Promise.resolve(token);
  }

  token = await AsyncStorage.getItem('jwt');
  return token;
};
