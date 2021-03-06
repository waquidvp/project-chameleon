import React from 'react';
import { StyleSheet, findNodeHandle } from 'react-native';
import styled from 'styled-components/native';
import { RNCamera } from 'react-native-camera';
import { BlurView } from 'react-native-blur';

const View = styled.View`
  flex: 1;
`;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  absolute: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});

export default class BlurredCamera extends React.Component {
  constructor() {
    super();

    this.state = {
      cameraRef: null,
    };
  }

  cameraLoaded = () => {
    this.setState({ cameraRef: findNodeHandle(this.camera) });
  };

  render() {
    return (
      <View>
        <RNCamera
          ref={(cam) => {
            this.camera = cam;
          }}
          onCameraReady={this.cameraLoaded}
          style={styles.absolute}
          type={RNCamera.Constants.Type.front}
        />
        <BlurView
          style={styles.absolute}
          viewRef={this.state.cameraRef}
          blurType="light"
          blurAmount={6}
        />
      </View>
    );
  }
}
