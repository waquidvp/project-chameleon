import { Dimensions, Platform } from 'react-native';

const screen = Dimensions.get('window');

const isIphoneTen = () =>
  Platform.OS === 'ios' &&
  !Platform.isPad &&
  !Platform.isTVOS &&
  (screen.height === 812 || screen.width === 812);

export const getHeight = () => screen.height;

export const getWidth = () => screen.width;

export const getStatusBarHeight = () => {
  if (isIphoneTen() === true) {
    return 44;
  } else if (Platform.OS === 'ios') {
    return 20;
  } else if (Platform.OS === 'android') {
    return 24;
  }
  return null;
};

export const screenDimensions = {
  ...screen,
  statusBarHeight: getStatusBarHeight(),
};
