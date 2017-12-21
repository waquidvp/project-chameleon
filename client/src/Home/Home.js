// @flow

import React from 'react';
import { Dimensions, Animated, StyleSheet } from 'react-native';
import styled from 'styled-components/native';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import Interactable from 'react-native-interactable';
import Camera from 'react-native-camera';

const Screen = {
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height,
};

const MainContainer = styled.View`
  flex: 1;
  background: green;
`;

const Button = styled.Button``;

const View = styled.View``;

const Text = styled.Text``;

class Home extends React.Component {
  constructor() {
    super();

    this.state = {};
    this._deltaY = new Animated.Value(Screen.height - 100);
  }

  render() {
    const { changeLoginState } = this.props.screenProps;
    const { currentUser } = this.props.data;

    return (
      <MainContainer>
        <Button title="Sign Out" onPress={() => changeLoginState(false)} />
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
                  inputRange: [0, Screen.height - 100],
                  outputRange: [0.5, 0],
                  extrapolateRight: 'clamp',
                }),
              },
            ]}
          />
          <Interactable.View
            verticalOnly
            snapPoints={[{ y: 0 }, { y: Screen.height - 65 }]}
            boundaries={{ top: -15, bottom: Screen.height - 50 }}
            initialPosition={{ y: Screen.height - 65 }}
            animatedValueY={this._deltaY}
          >
            <View style={styles.panel} pointerEvents="box-only">
              <Camera
                style={styles.container}
                aspect={Camera.constants.Aspect.fill}
                type={Camera.constants.Type.front}
              />
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
  panel: {
    height: Screen.height,
    padding: 20,
    backgroundColor: '#f7f5eee8',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 5,
    shadowOpacity: 0.4,
  },
  panelHeader: {
    alignItems: 'center',
  },
  panelHandle: {
    width: 40,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#00000040',
    marginBottom: 10,
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
