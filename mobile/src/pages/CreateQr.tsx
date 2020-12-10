import React from 'react';

import { View, Text } from 'react-native';
import Header from '../components/Header';

export default function CreateQr() {
  return (
    <>
      <Header title='Create Qr' arrowLeft={true} />
      <View style={{ flex: 1, backgroundColor: '#F2F2F2', justifyContent: 'center', alignItems: 'center' }}>
        <Text>Em breve...</Text>
        <Text>Coming soon...</Text>
      </View>
    </>
  )
}