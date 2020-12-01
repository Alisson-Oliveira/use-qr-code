import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, ScrollView, Linking } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { GET_STORAGE, REMOVE_LINK } from '../config/storage';

interface LinkProps {
  link: string,
}

export default function Panel() {
  const [links, setLinks] = useState<LinkProps[]>([]);
  const navigation = useNavigation();
  
  useEffect(() => { 
    GET_STORAGE().then(response => {
      if (response !== undefined) {
        setLinks(response);
      }
    })
  },[links]);

  function handleToScanQrCode() {
    return navigation.navigate('ReaderQr');
  }

  function handleAccessLink(link: string) {
    Linking.openURL(link).catch(err => console.error("Couldn't load page", err));
  };

  function handleRemoveLink(link: string) {
    REMOVE_LINK(link);
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
          {
            links.map((response, index) => (
              <View key={index} style={styles.containerLink}> 
                <RectButton style={styles.link} onPress={() => handleAccessLink(response.link)}>
                  <Feather style={styles.icon} name="link" size={27} />
                  <Text style={styles.dominio}>{response.link}</Text>
                </RectButton>
                <RectButton onPress={() => handleRemoveLink(response.link)}>
                  <Feather style={styles.iconClose} name="x" size={20} />
                </RectButton>
              </View>
            ))
          }
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
    padding: 6,
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between' 
  },

  link: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },

  dominio: {
    fontSize: 16,
    flex: 1,
    paddingRight: 12,
  },

  iconClose: {
    justifyContent: 'flex-end', 
    color: '#808080', 
  },
});