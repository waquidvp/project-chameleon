// @flow

import React from 'react';
import {
  Dimensions,
  Animated,
  StyleSheet,
  StatusBar,
  Platform,
} from 'react-native';
import styled from 'styled-components/native';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import Interactable from 'react-native-interactable';
import Camera from 'react-native-camera';
import Icon from 'react-native-vector-icons/FontAwesome';

import Button from '../components/Button';

const Screen = Platform.select({
  ios: () => ({
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    statusBarHeight: 20,
  }),
  android: () => ({
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    statusBarHeight: 24,
  }),
})();

const MainContainer = styled.View`
  flex: 1;
  background-color: rgba(55, 202, 195, 0.2);
  padding-top: ${props => props.statusBarHeight};
`;

const View = styled.View``;

const Text = styled.Text``;

class Home extends React.Component {
  constructor() {
    super();

    this.state = {};
    this._deltaY = new Animated.Value(Screen.height + Screen.statusBarHeight);
  }

  render() {
    const { changeLoginState } = this.props.screenProps;
    const { currentUser } = this.props.data;

    return (
      <MainContainer statusBarHeight={Screen.statusBarHeight}>
        <StatusBar
          barStyle="light-content"
          backgroundColor="#0000003c"
          translucent
        />
        <Button text="Sign Out" onPress={() => changeLoginState(false)} />
        {currentUser && (
          <View>
            <Text>{currentUser._id}</Text>
            <Text>{currentUser.email}</Text>
          </View>
        )}
        <View style={styles.panelContainer} pointerEvents="box-none">
          <Animated.View
            pointerEvents="box-none"
            style={[
              styles.panelContainer,
              {
                backgroundColor: 'black',
                opacity: this._deltaY.interpolate({
                  inputRange: [Screen.statusBarHeight, Screen.height - 40],
                  outputRange: [0.5, 0],
                  extrapolateRight: 'clamp',
                }),
              },
            ]}
          />
          <Interactable.View
            verticalOnly
            snapPoints={[
              { y: Screen.statusBarHeight },
              { y: Screen.height - 40 },
            ]}
            boundaries={{ top: 40, bottom: Screen.height - 25 }}
            initialPosition={{ y: Screen.height - 40 }}
            animatedValueY={this._deltaY}
          >
            <View style={styles.panel} pointerEvents="box-only">
              <Camera
                style={styles.container}
                aspect={Camera.constants.Aspect.fill}
                type={Camera.constants.Type.front}
              />
              <Animated.View
                style={[
                  styles.tab,
                  {
                    opacity: this._deltaY.interpolate({
                      inputRange: [Screen.statusBarHeight, Screen.height - 40],
                      outputRange: [0, 1],
                      extrapolateRight: 'clamp',
                    }),
                  },
                ]}
              >
                <Icon name="camera" color="white" size={20} />
              </Animated.View>
            </View>
          </Interactable.View>
        </View>
      </MainContainer>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  panelContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  tab: {
    height: 40,
    width: Screen.width,
    backgroundColor: 'rgb(55, 202, 195)',
    position: 'absolute',
    top: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  panel: {
    height: Screen.height + Screen.statusBarHeight,
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 19,
    borderTopRightRadius: 19,
    overflow: 'hidden',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 5,
    shadowOpacity: 0.4,
  },
});

export default graphql(gql`
  query User {
    currentUser {
      _id
      email
    }
  }
`)(Home);
