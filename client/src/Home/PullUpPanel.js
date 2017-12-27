import React from 'react';
import { Animated } from 'react-native';
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

const CameraTabContainer = styled.View`
  height: 40px;
  width: 100%;
  justify-content: center;
  align-items: center;
`;

const CameraView = ({ style, ...props }) => <Camera style={style} {...props} />;

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
  height: ${props => 40 + props.screenDimensions.bottomBarHeight};
  width: ${props => props.screenDimensions.width};
  background-color: rgb(55, 202, 195);
  position: absolute;
  top: 0;
  z-index: 1;
`;

class PullUpPanel extends React.Component {
  state = {};

  deltaY = new Animated.Value(screenDimensions.height - screenDimensions.bottomBarHeight - 40);

  render() {
    console.warn(this.deltaY);
    console.warn(screenDimensions);
    return (
      <MainContainer pointerEvents="box-none">
        <GreyOverlay pointerEvents="box-none" deltaY={this.deltaY} />
        <Interactable.View
          verticalOnly
          snapPoints={[
            { y: screenDimensions.height - screenDimensions.bottomBarHeight - 40 },
            { y: screenDimensions.statusBarHeight },
          ]}
          boundaries={{
            top: 0,
            bottom: screenDimensions.height - screenDimensions.bottomBarHeight - 20,
          }}
          initialPosition={{ y: screenDimensions.height - screenDimensions.bottomBarHeight - 40 }}
          animatedValueY={this.deltaY}
        >
          <PullUpPanelContainer pointerEvents="box-only" screenDimensions={screenDimensions}>
            <TopTab screenDimensions={screenDimensions} deltaY={this.deltaY}>
              <CameraTabContainer>
                <Icon name="camera" color="white" size={20} />
              </CameraTabContainer>
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
