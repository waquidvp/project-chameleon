import React from 'react';
import { Platform, StatusBar } from 'react-native';

const CustomStatusBar = Platform.select({
  ios: () => <StatusBar barStyle="dark-content" backgroundColor="#0000003c" translucent />,
  android: () => <StatusBar barStyle="light-content" backgroundColor="#0000003c" translucent />,
});

export default CustomStatusBar;
