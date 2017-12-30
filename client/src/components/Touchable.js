import React from 'react';
import PlatformTouchable from 'react-native-platform-touchable';

const Touchable = ({ style, children, ...props }) => (
  <PlatformTouchable style={style} {...props}>
    {children}
  </PlatformTouchable>
);

export default Touchable;
