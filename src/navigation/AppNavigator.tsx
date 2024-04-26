import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


import Home from '../screens/HomeScreen/index';
import { Text, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import Event from '../screens/EventScreen/index';
import Register from '../screens/RegisterScreen/index';
import QRDisplayScreen from '../screens/QRDisplayScreen/index';
import QRScanScreen from '../screens/QRScanScreen/index';

const Stack = createStackNavigator();





export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Event" component={Event} />
        <Stack.Screen name="QRScan" component={QRScanScreen} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="QRDisplay" component={QRDisplayScreen} />
 


      </Stack.Navigator>
    </NavigationContainer>
  );
}