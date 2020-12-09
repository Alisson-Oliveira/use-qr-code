import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const { Navigator, Screen } = createStackNavigator();

import Tools from './pages/Tools';
import ReaderQr from './pages/ReaderQr';
import About from './pages/About';
import Settings from './pages/Settings';

export default function Routes() {
  return (
    <NavigationContainer>
      <Navigator screenOptions={{ 
        headerShown: false,
      }}>
        <Screen 
          name="Tools" 
          component={Tools}
        />
        <Screen 
          name="ReaderQr" 
          component={ReaderQr}
        />
        <Screen 
          name="About" 
          component={About}
        />
        <Screen 
          name="Settings" 
          component={Settings}
        />
      </Navigator>
    </NavigationContainer>    
  );
}