import React from 'react';

import { Text, View, StyleSheet, ScrollView } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';

import { useNavigation } from '@react-navigation/native';

export default function Panel() {
  const navigation = useNavigation();

  function handleToScanQrCode() {
    return navigation.navigate('ReaderQr');
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.tools}>        
        <View style={styles.containerButtons}>
          <Text style={styles.title}>Tools</Text>
          <RectButton style={styles.button} onPress={handleToScanQrCode}>
            <Feather style={styles.icon} name="maximize" size={32} />
            <Text style={styles.subTitle}>Scan QR Code</Text>
          </RectButton>
          <RectButton style={styles.button}>
            <Feather style={styles.icon} name="help-circle" size={32} />
            <Text style={styles.subTitle}>Ajuda</Text>
          </RectButton>
        </View>
        <Text style={styles.title}>Recently Opened</Text>
        <View style={styles.links}>
          <View style={styles.containerLink}> 
            <RectButton style={styles.link}>
              <Feather style={styles.icon} name="globe" size={27} />
              <Text style={styles.dominio}>www.wos.com</Text>
            </RectButton>
            <RectButton>
              <Feather style={styles.iconClose} name="x" size={20} />
            </RectButton>
          </View>
          <View style={styles.containerLink}> 
            <RectButton style={styles.link}>
              <Feather style={styles.icon} name="globe" size={27} />
              <Text style={styles.dominio}>www.padim.com</Text>
            </RectButton>
            <RectButton>
              <Feather style={styles.iconClose} name="x" size={20} />
            </RectButton>
          </View>
          <View style={styles.containerLink}> 
            <RectButton style={styles.link}>
              <Feather style={styles.icon} name="globe" size={27} />
              <Text style={styles.dominio}>www.entregascariri.com</Text>
            </RectButton>
            <RectButton>
              <Feather style={styles.iconClose} name="x" size={20} />
            </RectButton>
          </View>
        </View>
      </View>  
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  tools: {
    width: '100%',
    padding: 24,
  },

  containerButtons: {
    marginBottom: 12,
  },

  title: {
    fontSize: 18,
  },

  button: {
    height: 64,
    flexDirection: 'row',
    alignItems: 'center',
  },

  icon: {
    marginRight: 12,
  },

  subTitle: {
    fontSize: 16,
  },

  links: {
    marginTop: 6,
  },

  containerLink: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between' 
  },

  link: {
    flex: 1,
    height: 56,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },

  dominio: {
    fontSize: 16,
  },

  iconClose: {
    justifyContent: 'flex-end', 
    color: '#808080', 
  },
});