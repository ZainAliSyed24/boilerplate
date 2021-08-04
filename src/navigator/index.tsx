//
//  index.js:
//  BoilerPlate
//
//  Created by Retrocube on 10/4/2019, 9:14:05 AM.
//  Copyright © 2019 Retrocube. All rights reserved.
//
import React, {ReactElement} from 'react';
import {
  NavigationContainer,
  NavigationContainerRef,
} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import DrawerNav from './Drawer';
import {AuthStack} from './Stacks';
// import { LoginContext } from '../';
import {navigatorRef} from '../services/NavigationService';

type RootStackParamList = {
  DrawerNav: undefined;
  AuthStack: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

function rootNavigator(): ReactElement {
  // const {isLogin, setLogin} = useContext(LoginContext);
  const isLogin = true;
  return (
    <NavigationContainer ref={navigatorRef}>
      <Stack.Navigator headerMode="none">
        {isLogin ? (
          <Stack.Screen
            name="DrawerNav"
            component={DrawerNav}
            options={{
              animationEnabled: false,
            }}
          />
        ) : (
          <Stack.Screen
            name="AuthStack"
            component={AuthStack}
            options={{
              animationEnabled: false,
            }}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default rootNavigator;
