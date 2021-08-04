import React, {ReactElement} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {
  createDrawerNavigator,
  DrawerContentComponentProps,
  DrawerNavigationProp,
} from '@react-navigation/drawer';
import AppDrawer from '../../containers/Drawer/AppDrawer';
import {CustomHeader} from '../navigatorHelper';
import {Screen1, Screen2, screen3, screen4} from '../../containers';

type StackParamList = {
  Screen1: undefined;
  Screen2: undefined;
  screen3: undefined;
  screen4: undefined;
};

const Stack = createStackNavigator<StackParamList>();

function DrawerStack({navigation}): ReactElement {
  return (
    <Stack.Navigator
      initialRouteName="Screen1"
      screenOptions={{headerShown: false}}>
      <Stack.Screen
        name="Screen1"
        component={Screen1}
        options={CustomHeader('screen1')}
      />
      <Stack.Screen
        name="Screen2"
        component={Screen2}
        options={CustomHeader('Screen2')}
      />
      <Stack.Screen
        name="screen3"
        component={screen3}
        options={CustomHeader('screen3')}
      />
      <Stack.Screen
        name="screen4"
        component={screen4}
        options={CustomHeader('screen4')}
      />
    </Stack.Navigator>
  );
}

export type DrawerParamList = {
  default: undefined;
};

export type DrawerNavigationProps<T extends keyof DrawerParamList = 'default'> =
  DrawerNavigationProp<DrawerParamList, T>;

const Drawer = createDrawerNavigator<DrawerParamList>();

function DrawerNav(): ReactElement {
  return (
    <Drawer.Navigator
      drawerStyle={{width: '70%'}}
      drawerContent={(props: DrawerContentComponentProps): ReactElement => (
        <AppDrawer {...props} />
      )}>
      <Drawer.Screen name="DrawerStack" component={DrawerStack} />
    </Drawer.Navigator>
  );
}
export default DrawerNav;
