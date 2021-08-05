//
//  index.js:
//  BoilerPlate
//
//  Created by Retrocube on 10/4/2019, 9:27:23 AM.
//  Copyright © 2019 Retrocube. All rights reserved.
//
import {showMessage, hideMessage} from 'react-native-flash-message';

interface ModalProps {
  message?: string;
  type?: string;
  hideOnPress?: boolean;
  onPress?: () => void;
  animated?: boolean;
  autoHide?: boolean;
  duration?: number;
  hideStatusBar?: boolean;
  floating?: boolean;
  position?: string;
  icon?: string;
  canRegisterAsDefault?: boolean;
}
const defaultProps: ModalProps = {
  type: 'danger',
  hideOnPress: true,
  onPress: () => 'none',
  animated: true,
  autoHide: true,
  duration: 3500,
  hideStatusBar: false,
  floating: false,
  position: 'top',
  icon: 'auto',
  canRegisterAsDefault: true,
};

const FlashMessage: React.FC<ModalProps> = props => {
  const {
    message,
    type,
    hideOnPress,
    onPress,
    animated,
    autoHide,
    duration,
    hideStatusBar,
    floating,
    position,
    icon,
    canRegisterAsDefault,
  } = props;

  showMessage({
    message: message,
    type: type,
    hideOnPress: hideOnPress,
    onPress: onPress,
    animated: animated,
    autoHide: autoHide,
    duration: duration,
    hideStatusBar: hideStatusBar,
    floating: floating,
    position: position,
    icon: icon,
    canRegisterAsDefault: canRegisterAsDefault,
  });
};
FlashMessage.defaultProps = defaultProps;
export default FlashMessage;
