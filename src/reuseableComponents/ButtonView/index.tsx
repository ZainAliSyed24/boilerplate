// components/Hello.tsx
import React from 'react';
import {
  View,
  Platform,
  TouchableOpacity,
  TouchableNativeFeedback,
} from 'react-native';

let disableClick = false;
const debounceTime = Platform.select({
  ios: 200,
  android: 700,
});

interface BtnProps {
  style?: object | number | [any];
  children?: React.ReactNode;
  isBackgroundBorderLess?: boolean;
  disableRipple?: boolean;
  enableClick?: boolean;
  onPress?: () => any;
}

const defaultProps: BtnProps = {
  style: {},
  isBackgroundBorderLess: false,
  disableRipple: false,
  enableClick: false,
};

const ButtonView: React.FC<BtnProps> = props => {
  const {
    enableClick,
    style,
    children,
    isBackgroundBorderLess,
    disableRipple,
    onPress,
    ...rest
  } = props;

  const _onPress = () => {
    if (enableClick && onPress) {
      onPress();
    } else if (!disableClick) {
      disableClick = true;
      if (onPress) {
        onPress();
      }

      setTimeout(() => {
        disableClick = false;
      }, debounceTime);
    }
  };

  if (Platform.OS == 'android') {
    let background = TouchableNativeFeedback.SelectableBackground();
    if (isBackgroundBorderLess) {
      background = TouchableNativeFeedback.SelectableBackgroundBorderless();
    } else if (disableRipple) {
      background = TouchableNativeFeedback.Ripple('transparent');
    }
    return (
      <TouchableNativeFeedback
        disabled={disableRipple}
        background={background}
        {...rest}
        onPress={_onPress}>
        <View style={style}>{children}</View>
      </TouchableNativeFeedback>
    );
  }

  const opacity = disableRipple ? 1 : 0.5;
  return (
    <TouchableOpacity
      style={style}
      {...rest}
      disabled={disableRipple}
      activeOpacity={opacity}
      onPress={_onPress}>
      {children}
    </TouchableOpacity>
  );
};

ButtonView.defaultProps = defaultProps;

export default ButtonView;
