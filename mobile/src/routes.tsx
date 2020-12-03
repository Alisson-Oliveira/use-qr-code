import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const { Navigator, Screen } = createStackNavigator();

import Panel from './pages/Panel';
import ContactUs from './pages/ContactUs';
import ReaderQr from './pages/ReaderQr';

export default function Routes() {
  return (
    <NavigationContainer>
      <Navigator screenOptions={{ 
        headerShown: false,
      }}>
        <Screen 
          name="Panel" 
          component={Panel}
          options={{ 
            headerShown: true,
            title: 'Qr Code', 
            headerTitleAlign: 'center' 
          }}
        />
        <Screen 
          name="ContactUs" 
          component={ContactUs}
          options={{ 
            headerShown: true,
            title: 'Contact Us', 
            headerTitleAlign: 'center' 
          }}
        />
        <Screen 
          name="ReaderQr" 
          component={ReaderQr}
        />
      </Navigator>
    </NavigationContainer>    
  );
}