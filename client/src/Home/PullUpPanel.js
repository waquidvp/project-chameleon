import React from 'react';
import { Animated, Platform, View, Dimensions } from 'react-native';
import styled from 'styled-components/native';
import Interactable from 'react-native-interactable';
import Icon from 'react-native-vector-icons/FontAwesome';
import Camera from 'react-native-camera';
import Orientation from 'react-native-orientation';

import screenDimensions from '../utils/screenDimensions';

const MainContainer = styled.View`
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
`;

const AnimatedGreyOverlay = ({
  style, deltaY, styleProp, ...props
}) => (
  <Animated.View
    style={[
      ...style,
      {
        backgroundColor: 'black',
        opacity: deltaY.interpolate({
          inputRange: [
            styleProp.statusBarHeight,
            styleProp.height - styleProp.bottomBarHeight - 40,
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
  height: ${props => props.styleProp.height + props.styleProp.statusBarHeight};
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
  style, children, deltaY, styleProp, ...props
}) => (
  <Animated.View
    style={[
      ...style,
      {
        opacity: deltaY.interpolate({
          inputRange: [
            styleProp.statusBarHeight,
            styleProp.height - styleProp.bottomBarHeight - 40,
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
  height: ${props => 40 + props.styleProp.bottomBarHeight};
  width: 100%;
  background-color: rgb(55, 202, 195);
  position: absolute;
  top: 0;
  z-index: 1;
`;

class PullUpPanel extends React.Component {
  state = {
    height: screenDimensions.height,
    width: screenDimensions.width,
    bottomBarHeight: screenDimensions.bottomBarHeight,
    statusBarHeight: screenDimensions.statusBarHeight,
  };

  // componentWillMount() {
  //   const initial = Orientation.getInitialOrientation();
  //   if (initial === 'LANDSCAPE') {
  //     this.setState({
  //       bottomBarHeight: 0,
  //     });
  //   }
  // }

  componentDidMount() {
    Orientation.addOrientationListener(this.orientationDidChange);
    Dimensions.addEventListener('change', this.dimensionsDidChange);
  }

  componentWillUnmount() {
    Orientation.removeOrientationListener(this.orientationDidChange);
  }

  dimensionsDidChange = ({ window }) => {
    this.setState({
      height: window.height,
      width: window.width,
    });
  }

  orientationDidChange = (orientation) => {
    if (orientation === 'LANDSCAPE') {
      this.setState({
        bottomBarHeight: 0,
      });
    } else if (orientation === 'PORTRAIT' || 'PORTRAITUPSIDEDOWN') {
      this.setState({
        bottomBarHeight: screenDimensions.bottomBarHeight,
      });
    }
  };

  pullCameraUp = () => {
    const { cameraPanel } = this;
    cameraPanel.snapTo({ index: 1 });
  };

  deltaY = new Animated.Value(this.state.height - this.state.bottomBarHeight - 40);

  panelConfig = Platform.select({
    ios: {
      boundaries: {
        top: 0,
        bottom: this.state.height - this.state.bottomBarHeight - 20,
      },
      snapPoints: [
        { y: this.state.height - this.state.bottomBarHeight - 40 },
        { y: this.state.statusBarHeight },
      ],
    },
    android: {
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
    },
  });

  render() {
    const {
      height, width, statusBarHeight, bottomBarHeight,
    } = this.state;

    return (
      <MainContainer pointerEvents="box-none">
        <GreyOverlay
          pointerEvents="none"
          deltaY={this.deltaY}
          styleProp={{
            height,
            statusBarHeight,
            bottomBarHeight,
          }}
        />
        <Interactable.View
          verticalOnly
          snapPoints={this.panelConfig.snapPoints}
          boundaries={this.panelConfig.boundaries}
          initialPosition={{ y: height - bottomBarHeight - 40 }}
          animatedValueY={this.deltaY}
          ref={(ref) => {
            this.cameraPanel = ref;
          }}
        >
          <PullUpPanelContainer
            pointerEvents="auto"
            styleProp={{
              height,
              statusBarHeight,
            }}
          >
            <TopTab
              styleProp={{
                bottomBarHeight,
                width,
                height,
                statusBarHeight,
              }}
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
