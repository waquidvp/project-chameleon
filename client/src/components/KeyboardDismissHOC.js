import React from 'react';
import { Keyboard, TouchableWithoutFeedback } from 'react-native';

/*
  Higher order component that takes in a component and returns a keyboard dismiss component.

  Usage:

    const KeyboardDismissView = KeyboardDismissHOC(View)
    ...
    render() {
      <KeyboardDismissView>
          ...
      </KeyboardDismissView>
    }
*/

const KeyboardDismissHOC = Component => (
  ({ children, style, ...props }) => (
    <TouchableWithoutFeedback
      onPress={Keyboard.dismiss}
      accessible={false}
    >
      <Component {...props} >
        {children}
      </Component>
    </TouchableWithoutFeedback>
  )
);

export default KeyboardDismissHOC;
