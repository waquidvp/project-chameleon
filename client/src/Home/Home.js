// @flow

import React from 'react';
import { Animated, StyleSheet, StatusBar } from 'react-native';
import styled from 'styled-components/native';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import Interactable from 'react-native-interactable';
import Camera from 'react-native-camera';
import Icon from 'react-native-vector-icons/FontAwesome';

import Button from '../components/Button';
import { screenDimensions } from '../utils/screenDimensions';

const MainContainer = styled.View`
  flex: 1;
  background-color: rgba(55, 202, 195, 0.2);
  padding-top: ${props => props.statusBarHeight};
`;

const TabContainer = styled.View`
  height: 40px;
  width: 100%;
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const View = styled.View``;

const Text = styled.Text``;

class Home extends React.Component {
  state = {};

  deltaY = new Animated.Value(screenDimensions.height - 40);

  render() {
    const { changeLoginState } = this.props.screenProps;
    const { currentUser } = this.props.data;

    console.warn(this.deltaY);

    return (
      <MainContainer statusBarHeight={screenDimensions.statusBarHeight}>
        <StatusBar barStyle="light-content" backgroundColor="#0000003c" translucent />
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
                opacity: this.deltaY.interpolate({
                  inputRange: [screenDimensions.statusBarHeight, screenDimensions.height - 40],
                  outputRange: [0.5, 0],
                }),
              },
            ]}
          />
          <Interactable.View
            verticalOnly
            snapPoints={[
              { y: screenDimensions.statusBarHeight },
              { y: screenDimensions.height - screenDimensions.bottomBarHeight - 40 },
            ]}
            boundaries={{
              top: 0,
              bottom: screenDimensions.height - screenDimensions.bottomBarHeight - 25,
            }}
            initialPosition={{ y: screenDimensions.height - screenDimensions.bottomBarHeight - 40 }}
            animatedValueY={this.deltaY}
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
                    opacity: this.deltaY.interpolate({
                      inputRange: [screenDimensions.statusBarHeight, screenDimensions.height - 40],
                      outputRange: [0, 1],
                    }),
                  },
                ]}
              >
                <TabContainer>
                  <Icon name="camera" color="white" size={20} />
                </TabContainer>
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
    height: 40 + screenDimensions.bottomBarHeight,
    width: screenDimensions.width,
    backgroundColor: 'rgb(55, 202, 195)',
    position: 'absolute',
    top: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  panel: {
    height: screenDimensions.height + screenDimensions.statusBarHeight,
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
