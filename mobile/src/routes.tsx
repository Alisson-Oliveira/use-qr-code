import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const { Navigator, Screen } = createStackNavigator();

import Panel from './pages/Panel';
import ReaderQr from './pages/ReaderQr';

export default function Routes() {
  return (
    <NavigationContainer>
      <Navigator>
        <Screen 
          name="Panel" 
          component={Panel} 
          options={{ 
            title: 'Qr Code', 
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