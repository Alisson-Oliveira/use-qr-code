import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Feather, Ionicons } from '@expo/vector-icons';
import { BarCodeEvent, BarCodeScanner } from 'expo-barcode-scanner';
import { RectButton } from 'react-native-gesture-handler';

export default function App() {
  const [hasPermission, setHasPermission] = useState(false);
  const [scanned, setScanned] = useState(false);
  const [domain, setDomain] = useState('');

  useEffect(() => {(
    async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();

      if (status === 'granted') {
        setHasPermission(true);
      }
    })();
  }, []);

  const handleBarCodeScanned = ({ data }: BarCodeEvent) => {
    setScanned(true);
    setDomain(data);
  };

  const handleBarCodeScannedCallback = (params: BarCodeEvent) => {}

  if (hasPermission === null) {
    return <View />;
  }

  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <>
      <BarCodeScanner
        onBarCodeScanned={ !scanned ? handleBarCodeScanned : handleBarCodeScannedCallback }
        style={[StyleSheet.absoluteFillObject, {
          justifyContent: 'flex-start',
          alignItems: 'center',
          paddingTop: 72,
        }]}
      >
        <Feather name="maximize" size={386} color='#FFFFFF' />
      </BarCodeScanner>

      {
        scanned &&
        <View style={styles.response}>
          <View style={styles.responseData}>
            <Text style={styles.title}>Link</Text>
            <View style={styles.containerLink}>
              <Text>{domain}</Text>
            </View>
            <RectButton style={styles.buttonAcess} >
              <Text style={styles.title}>Acessar</Text>
              <Feather name="link-2" size={24} />
            </RectButton>
            <RectButton style={styles.buttonAgain} onPress={() => setScanned(false)}>
              <Text style={styles.title}>Scanear Novamente</Text>
              <Feather name="rotate-ccw" size={24} />
            </RectButton>
          </View>
        </View>        
      }
    </>
  );
}

const styles = StyleSheet.create({
  response: {
    flex: 1,
    marginTop: 54,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },

  responseData: {
    width: '80%',
    height: 412,
    padding: 12,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 12,
    position: 'absolute',
    backgroundColor: '#FFFFFF',
  },

  containerLink: {
    height: 200,
    padding: 12, 
    width: '100%', 
    borderRadius: 12, 
    justifyContent: 'center', 
    alignItems: 'center', 
    backgroundColor: '#F0F0F0'
  },

  title: {
    color: '#000000',
    paddingRight: 6,
    fontSize: 20,
  },

  buttonAcess: {
    width: '100%',
    height: 64,
    borderRadius: 12,
    backgroundColor: '#00CC44',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  buttonAgain: {
    borderRadius: 12,
    height: 64,
    width: '100%',
    backgroundColor: '#808080',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  buttons: {
    bottom: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center', 
    marginRight: 18,
    marginBottom: 32,
    borderRadius: 100,
    position: 'absolute',
    height: 64,
    width: 64,
    backgroundColor: '#FFFFFF',
    elevation: 3,
  }
});