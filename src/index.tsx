import React, {Component} from 'react';
import {StatusBar, View} from 'react-native';
import {ModalPortal} from 'react-native-modals';
// import {showMessage, hideMessage} from 'react-native-flash-message';

import RootNavigator from './navigator';

export default class App extends React.Component {
  render() {
    // console.warn(showMessage({message: 'Simple message', type: 'info'}));
    return (
      <>
        <RootNavigator />
        <ModalPortal />
      </>
    );
  }
}
