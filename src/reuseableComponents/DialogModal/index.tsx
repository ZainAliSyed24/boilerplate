import React, {Component} from 'react';
import {
  StyleSheet,
  Dimensions,
  Image,
  View,
  TouchableOpacity,
} from 'react-native';
import {Modal, SlideAnimation, ModalContent} from 'react-native-modals';

const {width} = Dimensions.get('window');

interface ModalProps {
  style?: object | number | [any];
  contentStyle?: object;
  children?: React.ReactNode;
  hide?: () => void;
  isVisible?: boolean;
  overlayBackgroundColor?: string;
}

const defaultProps: ModalProps = {
  isVisible: false,
  overlayBackgroundColor: '#000',
};

const DialogModal: React.FC<ModalProps> = props => {
  const {
    style,
    contentStyle,
    children,
    hide,
    isVisible,
    overlayBackgroundColor,
  } = props;

  return (
    <Modal
      visible={isVisible}
      onHardwareBackPress={() => {
        hide();
        return true;
      }}
      modalAnimation={new SlideAnimation({slideFrom: 'bottom'})}
      style={{flex: 1, justifyContent: 'flex-end'}}
      onTouchOutside={hide}
      swipeDirection={['down']}
      onSwipeOut={hide}
      rounded={false}
      overlayBackgroundColor={overlayBackgroundColor}
      modalStyle={[
        {
          borderTopLeftRadius: 15,
          borderTopRightRadius: 15,
        },
        style,
      ]}>
      <ModalContent style={[styles.modalContent, contentStyle]}>
        <TouchableOpacity onPress={hide} style={styles.closebtn}>
          <Image source={require('./close.png')} />
        </TouchableOpacity>
        {children}
      </ModalContent>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContent: {
    width: width,
    minHeight: 130,
    backgroundColor: '#ededed',
  },
  closebtn: {
    alignItems: 'flex-end',
    marginBottom: 8,
  },
});
DialogModal.defaultProps = defaultProps;
export default DialogModal;
