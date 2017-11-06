// @flow

import React from 'react';
import { StyleSheet } from 'react-native';

import Camera from 'react-native-camera';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default ({ children }) => (
  <Camera
    style={styles.container}
    aspect={Camera.constants.Aspect.fill}
  >
    {children}
  </Camera>
);
