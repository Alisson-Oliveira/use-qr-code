import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Image, Linking } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Camera } from 'expo-camera';
import { BarCodeEvent, BarCodeScanner } from 'expo-barcode-scanner';
import { RectButton } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { ADD_LINK, GET_STORAGE, SET_STORAGE } from '../config/storage';
import maximizeImg from '../images/maximize.png';

export default function App() {
  const [hasPermission, setHasPermission] = useState(false);
  const [scanned, setScanned] = useState(false);
  const [domain, setDomain] = useState('');
  const navigation = useNavigation();

  useEffect(() => {(
    async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  async function handleBarCodeScanned({ data }: BarCodeEvent) {
    setScanned(true);
    setDomain(data);
  };

  function handleAccess(link: string) {
    Linking.openURL(link).catch(err => {
      console.error(err);
      alert("Couldn't load page");
    });
    
    addLink(link);
  };

  function handleBackHome(link: string) {
    addLink(link);
  };

  async function addLink(link: string) {
    const response = await GET_STORAGE(); 

    if (!response) {
      return ;
    }

    if (response.length === 0) {
      const newLink = {
        link
      }

      const data: LinkProps[] = [ newLink ];

      SET_STORAGE(data); 
    } else {
      const data = {
        link
      }

      ADD_LINK(data);
    }

    navigation.goBack();
  }

  async function handleBarCodeScannedCallback() {}

  if (!hasPermission) {
    return (
      <View style={styles.loading}>
        <Text>Carregando...</Text>
      </View>
    );
  }

  return (
    <>
      <BarCodeScanner
        onBarCodeScanned={ !scanned ? handleBarCodeScanned : handleBarCodeScannedCallback }
        style={[StyleSheet.absoluteFillObject, {
          backgroundColor: '#DDDDDD',
          justifyContent: 'flex-start',
          alignItems: 'center',
          paddingTop: 112,
        }]}
      >
      {
        !scanned &&
        <>
          <Image source={maximizeImg} />
          <RectButton style={styles.buttonClose} onPress={navigation.goBack}>
            <Feather name="x" size={32} color='#000000' />
          </RectButton>
        </>
      }
      </BarCodeScanner>
      {
        scanned &&
        <View style={styles.response}>
          <View style={styles.responseData}>
            <Text style={styles.title}>Link</Text>
            <View style={styles.containerLink}>
              <Text>{domain}</Text>
            </View>
            <RectButton style={styles.buttonAcess} onPress={() => handleAccess(domain)} >
              <Text style={styles.title}>Acessar</Text>
              <Feather name="link-2" size={24} />
            </RectButton>
            <RectButton style={styles.buttonAgain} onPress={() => setScanned(false)}>
              <Text style={[styles.title, { color: '#FFFFFF' }]}>Scanear Novamente</Text>
              <Feather name="rotate-ccw" size={24} color='#FFFFFF' />
            </RectButton>
            <RectButton style={styles.buttonBackHome} onPress={() => handleBackHome(domain)}>
              <Text style={[styles.title, { color: '#FFFFFF' }]}>Voltar ao Inicio</Text> 
              <Feather name="corner-down-left" size={32} color='#FFFFFF' />
            </RectButton>
          </View>
        </View>        
      }
    </>
  );
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  response: {
    flex: 1,
    marginBottom: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },

  buttonClose: {
    width: 64,
    height: 64,
    elevation: 3,
    marginTop: 92,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },

  responseData: {
    height: 480,
    padding: 12,
    width: '80%',
    borderRadius: 12,
    alignItems: 'center',
    position: 'absolute',
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    justifyContent: 'space-between',
  },

  containerLink: {
    height: 200,
    padding: 12, 
    width: '100%', 
    borderRadius: 12, 
    alignItems: 'center', 
    justifyContent: 'center',
    backgroundColor: '#F0F0F0'
  },

  title: {
    fontSize: 20,
    paddingRight: 6,
    color: '#000000',
  },

  buttonAcess: {
    height: 64,
    width: '100%',
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#00CC44',
  },

  buttonAgain: {
    height: 64,
    width: '100%',
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#808080',
  },

  buttonBackHome: {
    height: 64,
    width: '100%',
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#404040',
  },

  buttons: {
    right: 0,
    bottom: 0,
    width: 64,
    height: 64,
    elevation: 3,
    marginRight: 18,
    marginBottom: 32,
    borderRadius: 100,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  }
});