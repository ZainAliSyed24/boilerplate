import React, {Component} from 'react';
import {StatusBar, View} from 'react-native';

import RootNavigator from './navigator';

export default class App extends React.Component {
  render() {
    return <RootNavigator />;
  }
}
