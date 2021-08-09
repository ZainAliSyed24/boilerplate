import React, {Component} from 'react';
import {StatusBar, View, Text} from 'react-native';
import {ModalPortal} from 'react-native-modals';
import Toast, {ToastProvider} from 'react-native-toast-notifications';
import {ToastRef, FlashStyle} from './reuseableComponents/FlashMessage';

import RootNavigator from './navigator';

export default class App extends React.Component {
  render() {
    // console.warn(showMessage({message: 'Simple message', type: 'info'}));
    return (
      <ToastProvider>
        <RootNavigator />
        <ModalPortal />
        <Toast
          ref={ToastRef}
          renderToast={toast => <FlashStyle toast={toast} />}
        />
      </ToastProvider>
    );
  }
}
