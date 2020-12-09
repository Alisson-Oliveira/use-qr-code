import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

interface HeaderProps {
  title: string,
  arrowLeft?: boolean,
}

export default function Header({ title, arrowLeft }: HeaderProps) {
  const { goBack } = useNavigation();
  return (
    <View style={styles.header}>
      {
        arrowLeft && <Feather onPress={goBack} style={styles.arrowLeft} name='arrow-left' size={24} />
      }
      <Text style={styles.title}>{title}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#FFFFFF', 
    justifyContent: 'center', 
    alignItems: 'center', 
    height: 54, 
    elevation: 3
  },

  arrowLeft: {
    position: 'absolute', 
    left: 16,
  },

  title: {
    color: '#000000', 
    fontSize: 20,
  },
});