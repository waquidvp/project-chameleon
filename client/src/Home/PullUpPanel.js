import React from 'react';
import { Animated, Platform, View } from 'react-native';
import styled from 'styled-components/native';
import Interactable from 'react-native-interactable';
import Icon from 'react-native-vector-icons/FontAwesome';
import Camera from 'react-native-camera';

import { screenDimensions } from '../utils/screenDimensions';

const MainContainer = styled.View`
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
`;

const AnimatedGreyOverlay = ({ style, deltaY, ...props }) => (
  <Animated.View
    style={[
      ...style,
      {
        backgroundColor: 'black',
        opacity: deltaY.interpolate({
          inputRange: [
            screenDimensions.statusBarHeight,
            screenDimensions.height - screenDimensions.bottomBarHeight - 40,
          ],
          outputRange: [0.5, 0],
          extrapolate: 'clamp',
        }),
      },
    ]}
    {...props}
  />
);

const GreyOverlay = styled(AnimatedGreyOverlay)`
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
`;

const PullUpPanelContainer = styled.View`
  height: ${props => props.screenDimensions.height + props.screenDimensions.statusBarHeight};
  background-color: #ffffff;
  border-top-left-radius: 19;
  border-top-right-radius: 19;
  overflow: hidden;
`;

const CameraTabTouch = styled.TouchableWithoutFeedback``;

const CameraTabContainer = styled.View`
  height: 40px;
  width: 100%;
  justify-content: center;
  align-items: center;
`;

const CameraView = ({ style, ...props }) => (
  <View style={style} pointerEvents="none">
    <Camera style={style} {...props} />
  </View>
);

const MainCameraView = styled(CameraView)`
  flex: 1;
`;

const AnimatedTopTab = ({
  style, children, deltaY, ...props
}) => (
  <Animated.View
    style={[
      ...style,
      {
        opacity: deltaY.interpolate({
          inputRange: [
            screenDimensions.statusBarHeight,
            screenDimensions.height - screenDimensions.bottomBarHeight - 40,
          ],
          outputRange: [0, 1],
          extrapolate: 'clamp',
        }),
      },
    ]}
    {...props}
  >
    {children}
  </Animated.View>
);

const TopTab = styled(AnimatedTopTab)`
  height: ${props => 40 + props.bottomBarHeight};
  width: ${props => props.width};
  background-color: rgb(55, 202, 195);
  position: absolute;
  top: 0;
  z-index: 1;
`;

class PullUpPanel extends React.Component {
  state = {
    cameraTabOpen: false,
    height: screenDimensions.height,
    width: screenDimensions.width,
    bottomBarHeight: screenDimensions.bottomBarHeight,
    statusBarHeight: screenDimensions.statusBarHeight,
  };

  onPanelSnap = (event) => {
    const { index } = event.nativeEvent;

    switch (index) {
      case 0:
        this.setState({ cameraTabOpen: false });
        break;
      case 1:
        this.setState({ cameraTabOpen: true });
        break;
      default:
        break;
    }
  };

  pullCameraUp = () => {
    const { cameraPanel } = this;
    const { cameraTabOpen } = this.state;

    if (cameraTabOpen === false) {
      cameraPanel.snapTo({ index: 1 });
      this.setState({ cameraTabOpen: true });
    }
  };

  deltaY = new Animated.Value(this.state.height - this.state.bottomBarHeight - 40);

  panelConfig = Platform.select({
    ios: () => ({
      boundaries: {
        top: 0,
        bottom: this.state.height - this.state.bottomBarHeight - 20,
      },
      snapPoints: [
        { y: this.state.height - this.state.bottomBarHeight - 40 },
        { y: this.state.statusBarHeight },
      ],
    }),
    android: () => ({
      boundaries: {
        top: this.state.statusBarHeight,
        bottom: this.state.height - this.state.bottomBarHeight - 40,
        bounce: 0,
      },
      snapPoints: [
        {
          y: this.state.height - this.state.bottomBarHeight - 40,
          damping: 0.8,
          tension: 100,
        },
        {
          y: this.state.statusBarHeight,
          damping: 0.8,
          tension: 100,
        },
      ],
    }),
  });

  render() {
    return (
      <MainContainer>
        <GreyOverlay pointerEvents="none" deltaY={this.deltaY} />
        <Interactable.View
          verticalOnly
          snapPoints={this.panelConfig.snapPoints}
          boundaries={this.panelConfig.boundaries}
          initialPosition={{ y: this.state.height - this.state.bottomBarHeight - 40 }}
          animatedValueY={this.deltaY}
          ref={(ref) => {
            this.cameraPanel = ref;
          }}
          onSnap={this.onPanelSnap}
        >
          <PullUpPanelContainer pointerEvents="auto" screenDimensions={screenDimensions}>
            <TopTab
              bottomBarHeight={this.state.bottomBarHeight}
              width={this.state.width}
              deltaY={this.deltaY}
            >
              <CameraTabTouch
                onPress={() => {
                  this.pullCameraUp();
                }}
              >
                <CameraTabContainer>
                  <Icon name="camera" color="white" size={20} />
                </CameraTabContainer>
              </CameraTabTouch>
            </TopTab>
            <MainCameraView
              aspect={Camera.constants.Aspect.fill}
              type={Camera.constants.Type.front}
            />
          </PullUpPanelContainer>
        </Interactable.View>
      </MainContainer>
    );
  }
}

export default PullUpPanel;
