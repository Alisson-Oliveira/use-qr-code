import React from 'react';
import { Text, View } from 'react-native';
import Header from '../components/Header';

export default function Details() {
  return (
    <>
      <Header title={'Details'} arrowLeft={true} />
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Em Breve...</Text>
        <Text>Coming Soon...</Text>
      </View>
    </>
  );
}