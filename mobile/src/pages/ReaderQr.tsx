import React, { useState, useEffect, useRef } from 'react';
import { Text, View, StyleSheet, Linking, Share, Animated } from 'react-native';
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
  const animatedImage = useRef(new Animated.Value(300)).current;
  const navigation = useNavigation();

  useEffect(() => {(
    async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();

    animatedImageSmall();
  }, []);

  function animatedImageSmall() {
    Animated.timing(animatedImage, {
      toValue: 270,
      duration: 3000,
      useNativeDriver: false
    }).start(() => animatedImageBig());
  };

  function animatedImageBig() {
    Animated.timing(animatedImage, {
      toValue: 300,
      duration: 3000,
      useNativeDriver: false
    }).start(() => animatedImageSmall());
  };

  async function handleBarCodeScanned({ data }: BarCodeEvent) {
    setScanned(true);
    setDomain(data);
  };

  function handleAccess(link: string) {
    Linking.openURL(link).catch(err => {
      console.error(err);
      alert("Couldn't load page");
    });

    navigation.goBack();
  };

  function handleShare(link: string) { 
    try {
      Share.share({ message: link })
        .catch(err => {
          console.error(err);
          alert("Couldn't share");
        });

      navigation.goBack();
    } catch (error) {
      console.error(error);
    }
  }

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
  }

  async function handleBarCodeScannedCallback({ data }: BarCodeEvent) {
    addLink(data);
  }

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
        onBarCodeScanned={ 
          !scanned ? handleBarCodeScanned : handleBarCodeScannedCallback 
        }
        style={ !scanned && StyleSheet.absoluteFillObject }
      />
      {
        !scanned && (
          <View style={styles.containerMaximize}>
            <View style={{ width: 300, height: 300, justifyContent: 'center', alignItems: 'center' }}>
              <Animated.Image source={maximizeImg}
                style={{
                  width: animatedImage,
                  height: animatedImage,
                }}
              />
            </View>
            <RectButton style={styles.buttonClose} onPress={navigation.goBack}>
              <Feather name="x" size={32} color='#000000' />
            </RectButton>
          </View>
        ) 
      }
      {
        scanned && (
          <View style={styles.response}>
            <View style={styles.responseData}>
              <Text style={[styles.title, { color: '#000000' }]}>Link</Text>
              <View style={styles.containerLink}>
                <Text>{domain}</Text>
              </View>
              <View style={{flexDirection: 'row'}}>
                <RectButton style={styles.buttonAcess} onPress={() => handleAccess(domain)} >
                  <Text style={styles.title}>Acess</Text>
                  <Feather name="link-2" size={24} color='#FFFFFF' />
                </RectButton>
                <RectButton style={styles.buttonShare} onPress={() => handleShare(domain)} >
                  <Text style={styles.title}>Share</Text>
                  <Feather name="share-2" size={24} color='#FFFFFF' />
                </RectButton>
              </View>
              <RectButton style={styles.buttonAgain} onPress={() => setScanned(false)}>
                <Text style={styles.title}>Scan Again</Text>
                <Feather name="rotate-ccw" size={24} color='#FFFFFF' />
              </RectButton>
              <RectButton style={styles.buttonBackHome} onPress={navigation.goBack}>
                <Text style={styles.title}>Back to the Panel</Text> 
                <Feather name="corner-down-left" size={32} color='#FFFFFF' />
              </RectButton>
            </View>
          </View>
        )
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

  containerMaximize: {
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center'
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
    color: '#FFFFFF',
  },

  buttonAcess: {
    flex: 1,
    height: 64,
    marginRight: 5,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#00CC44',
  },

  buttonShare: {
    flex: 1,
    height: 64,
    marginLeft: 5,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0099FF',
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