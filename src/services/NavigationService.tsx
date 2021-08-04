//
//  NavigationService.js:
//  BoilerPlate
//
//  Created by Retrocube on 10/4/2019, 9:35:30 AM.
//  Copyright © 2019 Retrocube. All rights reserved.
//
import React from 'react';
import {StackActions} from '@react-navigation/native';
import {DrawerActions} from '@react-navigation/native';

const navigatorRef = React.createRef();

const navigate = (routeName, params = {}) =>
  navigatorRef.current?.navigate(routeName, params);

const push = (routeName, params = {}) =>
  navigatorRef.current?.dispatch(StackActions.push(routeName, params));

const pop = (count = 1) =>
  navigatorRef.current?.dispatch(StackActions.pop(count));

const popToTop = () => navigatorRef.current?.dispatch(StackActions.popToTop());

const reset = routeName =>
  navigatorRef.current?.reset({
    index: 0,
    routes: [{name: routeName}],
  });

const openDrawer = () =>
  navigatorRef.current?.dispatch(DrawerActions.openDrawer());

const closeDrawer = () =>
  navigatorRef.current?.dispatch(DrawerActions.closeDrawer());

const toggleDrawer = () =>
  navigatorRef.current?.dispatch(DrawerActions.toggleDrawer());

export {
  navigatorRef,
  navigate,
  push,
  pop,
  openDrawer,
  closeDrawer,
  toggleDrawer,
  popToTop,
  reset,
};
