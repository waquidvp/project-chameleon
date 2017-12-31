import React from 'react';
import { Platform, TouchableHighlight, TouchableNativeFeedback, View } from 'react-native';
import PlatformTouchable from 'react-native-platform-touchable';

const Touch = Platform.select({
  ios: TouchableHighlight,
  android: TouchableNativeFeedback,
});

const Touchable = ({ style, children, list, ...props }) => {
  if (list) {
    return (
      <Touch style={style} {...props}>
        <View>
          {children}
        </View>
      </Touch>
    );
  }

  return (
    <PlatformTouchable style={style} {...props}>
      {children}
    </PlatformTouchable>
  );
};

export default Touchable;
