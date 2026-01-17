import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {RootStackParamList} from './types';

import BottomTabNavigator from './BottomTabNavigator';
import DetailScreen from '../screens/DetailScreen/DetailScreen';

const Stack = createStackNavigator<RootStackParamList>();

const RootStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#FFFFFF',
        },
        headerTintColor: '#007AFF',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
      <Stack.Screen
        name="MainTabs"
        component={BottomTabNavigator}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Detail"
        component={DetailScreen}
        options={{
          title: 'Detalle del Producto',
        }}
      />
    </Stack.Navigator>
  );
};

export default RootStackNavigator;