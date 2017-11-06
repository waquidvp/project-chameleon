// @flow

import React from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';

import CameraBgView from './components/CameraBgView';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default () => (
  <View style={styles.container}>
    <CameraBgView />
  </View>
);
