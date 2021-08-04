import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Login} from '../../containers';

type StackParamList = {
  Login: undefined;
};

const Stack = createStackNavigator<StackParamList>();

export default function AuthStack(): React.ReactElement {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={Login}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}
