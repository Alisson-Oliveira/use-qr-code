import React from 'react';
import { Feather } from '@expo/vector-icons';
import { View, Text, StyleSheet } from 'react-native';

export default function Loading() {
  return (
    <View style={styles.loading}>
      <Text style={styles.text}>Loading...</Text>
      <Feather name='loader' size={20}/>
    </View>
  );
}

const styles = StyleSheet.create({
  loading: {
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center',
  },
   
  text: {
    fontSize: 16, 
    marginBottom: 12,
  },
});