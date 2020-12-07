import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const { Navigator, Screen } = createStackNavigator();

import Tools from './pages/Tools';
import ReaderQr from './pages/ReaderQr';
import About from './pages/About';
import ContactMe from './pages/ContactMe';

export default function Routes() {
  return (
    <NavigationContainer>
      <Navigator screenOptions={{ 
        headerShown: false,
      }}>
        <Screen 
          name="Tools" 
          component={Tools}
          options={{ 
            headerShown: true,
            title: 'Use Qr Code', 
            headerTitleAlign: 'center' 
          }}
        />
        <Screen 
          name="ReaderQr" 
          component={ReaderQr}
        />
        <Screen 
          name="About" 
          component={About}
          options={{ 
            headerShown: true,
            title: 'About', 
            headerTitleAlign: 'center' 
          }}
        />
        <Screen 
          name="ContactMe" 
          component={ContactMe}
          options={{ 
            headerShown: true,
            title: 'Contact Me', 
            headerTitleAlign: 'center' 
          }}
        />
      </Navigator>
    </NavigationContainer>    
  );
}