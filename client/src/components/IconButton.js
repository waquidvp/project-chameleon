import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import PlatformTouchable from 'react-native-platform-touchable';

import Touchable from './Touchable';

const TouchContainer = styled.View`
  height: 40px;
  width: 40px;
  border-radius: 20px;
`;

const Touch = styled(Touchable)`
  height: 40px;
  width: 40px;
  border-radius: 20px;
  align-items: center;
  justify-content: center;
`;

class IconButton extends React.Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    color: PropTypes.string,
    size: PropTypes.number,
    onPress: PropTypes.func.isRequired,
  };

  static defaultProps = {
    color: 'rgba(0, 0, 0, 0.87)',
    size: 20,
  };

  state = {};

  render() {
    const {
      name, color, size, onPress,
    } = this.props;

    return (
      <TouchContainer>
        <Touch
          onPress={() => onPress()}
          background={PlatformTouchable.SelectableBackgroundBorderless()}
        >
          <Icon name={name} color={color} size={size} />
        </Touch>
      </TouchContainer>
    );
  }
}

export default IconButton;
