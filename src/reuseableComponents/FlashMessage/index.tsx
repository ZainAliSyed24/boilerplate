//
//  index.js:
//  BoilerPlate
//
//  Created by Retrocube on 8/7/2021.
//  Copyright © 2021 Retrocube. All rights reserved.
//
import React from 'react';
import {View, Text, StyleSheet, Platform} from 'react-native';

interface MsgProps {
  message?: string;
  type?: string;
  animationType?: string;
  duration?: number;
  placement?: string;
  offset?: number;
}

const ToastRef = React.createRef();

const FlashStyle: React.ReactElement = (props: object) => {
  let backgroundcolor = '#f5756c';

  switch (props.toast.type) {
    case 'normal':
      backgroundcolor = '#5bc0de';
      break;
    case 'success':
      backgroundcolor = '#22bb33';
      break;
    case 'warning':
      backgroundcolor = '#f0ad4e';
      break;
    case 'custom':
      backgroundcolor = '#aaaaaa';
      break;
    default:
      backgroundcolor = '#f5756c';
  }

  return (
    <View
      style={[
        styles.msgView,
        {backgroundColor: backgroundcolor, padding: props.toast.offset},
      ]}>
      <Text style={styles.msgTxt}>{props.toast.message}</Text>
    </View>
  );
};

const FlashMessage: React.FC<MsgProps> = ({
  message,
  type = 'danger', //normal | success | warning | danger | custom
  animationType = 'slide-in', //slide-in | zoom-in
  duration = 3500,
  placement = 'top', //top | bottom
  offset = 8,
}) => {
  ToastRef.current?.show(message, {
    type: type,
    duration: duration,
    placement: placement,
    animationType: animationType,
    offset: offset,
  });
};

export {ToastRef, FlashMessage, FlashStyle};

const styles = StyleSheet.create({
  msgView: {
    borderRadius: 3,
    marginTop: Platform.OS == 'ios' ? 36 : 18,
    minWidth: 250,
  },
  msgTxt: {
    textAlign: 'center',
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});
