import React, { useState, useEffect, useRef } from 'react';
import { Text, View, StyleSheet, Linking, Share, Animated } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Camera } from 'expo-camera';
import { BarCodeEvent, BarCodeScanner } from 'expo-barcode-scanner';
import { RectButton } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { ADD_LINK, GET_STORAGE, SET_STORAGE } from '../config/storage';
import { GET_LANGUAGE } from '../config/languages';
import { scan as engScan } from '../languages/english';
import { scan as porScan } from '../languages/portuguese';
import maximizeImg from '../images/maximize.png';

export default function App() {
  const [hasPermission, setHasPermission] = useState(false);
  const [scanned, setScanned] = useState(false);
  const [domain, setDomain] = useState('');
  const animatedImage = useRef(new Animated.Value(300)).current;
  const navigation = useNavigation();
  const [languageScene, setLanguageScene] = useState<LanguageScanProps>();

  useEffect(() => {(
    async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();

    GET_LANGUAGE()
    .then(languageData => {
      if (languageData) {
        if (languageData === 'english') {
          setLanguageScene(engScan);
        } else {
          setLanguageScene(porScan);
        }
      }
    })
    .catch(error => {
      console.error(error);
      setLanguageScene(engScan);
    });

    animatedImageSmall();
  }, []);

  function animatedImageSmall() {
    Animated.timing(animatedImage, {
      toValue: 270,
      duration: 2000,
      useNativeDriver: false
    }).start(() => animatedImageBig());
  };

  function animatedImageBig() {
    Animated.timing(animatedImage, {
      toValue: 300,
      duration: 2000,
      useNativeDriver: false
    }).start(() => animatedImageSmall());
  };

  async function handleBarCodeScanned({ data }: BarCodeEvent) {
    setScanned(true);
    setDomain(data);
    
    addLink(data);
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

  async function handleBarCodeScannedCallback() { }

  if (!hasPermission) {
    return (
      <View style={styles.container}>
        <Text>{languageScene?.loading}</Text>
      </View>
    );
  }

  return (
    <> 
      <BarCodeScanner
        barCodeTypes={[ BarCodeScanner.Constants.BarCodeType.qr ]}
        onBarCodeScanned={ !scanned ? handleBarCodeScanned : handleBarCodeScannedCallback }
        style={ !scanned && StyleSheet.absoluteFillObject }
      />
      {
        !scanned && (
          <View style={styles.container}>
            <View style={styles.imageAnimated}>
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
              <Text style={styles.titleResult}>{languageScene?.result}</Text>
              <View style={styles.containerResult}>
                <Text>{domain}</Text>
              </View>
              <View style={styles.buttonsAcessShare}>
                <RectButton 
                  style={styles.buttonAcess} 
                  onPress={() => handleAccess(domain)}
                >
                  <Text style={styles.titleButton}>{languageScene?.acess}</Text>
                  <Feather 
                    name="link-2" 
                    size={24} 
                    color='#FFFFFF' 
                  />
                </RectButton>
                <RectButton 
                  style={styles.buttonShare} 
                  onPress={() => handleShare(domain)}
                >
                  <Text style={
                    languageScene?.share !== 'Compartilhar' ? 
                      styles.titleButton : [
                      styles.titleButton, { 
                      fontSize: 18, 
                      paddingRight: 6 
                    }]
                    }>{languageScene?.share}</Text>
                  <Feather 
                    name="share-2" 
                    size={languageScene?.share !== 'Compartilhar' ? 24 : 20} 
                    color='#FFFFFF' 
                  />
                </RectButton>
              </View>
              <RectButton 
                style={styles.buttonAgain} 
                onPress={() => setScanned(false)}
              >
                <Text style={styles.titleButton}>{languageScene?.again}</Text>
                <Feather 
                  name="rotate-ccw" 
                  size={24} 
                  color='#FFFFFF' 
                />
              </RectButton>
              <RectButton 
                style={styles.buttonBackHome} 
                onPress={navigation.goBack}
              >
                <Text style={styles.titleButton}>{languageScene?.leave}</Text> 
                <Feather 
                  name="corner-down-left" 
                  size={24} 
                  color='#FFFFFF' 
                />
              </RectButton>
            </View>
          </View>
        )
      }
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  imageAnimated: {
    width: 300, 
    height: 300, 
    justifyContent: 'center', 
    alignItems: 'center'
  },

  response: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#DDDDDD',
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
    elevation: 5,
    borderRadius: 12,
    alignItems: 'center',
    position: 'absolute',
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    justifyContent: 'space-between',
  },

  containerResult: {
    height: 200,
    padding: 12, 
    width: '100%',
    borderRadius: 12, 
    alignItems: 'center', 
    justifyContent: 'center',
    backgroundColor: '#F0F0F0'
  },

  titleResult: {
    fontSize: 20,
    color: '#000000',
  },

  buttonsAcessShare: {
    flexDirection: 'row',
  },

  titleButton: {
    fontSize: 20,
    paddingRight: 12,
    color: '#FFFFFF',
  },

  buttonAcess: {
    flex: 1,
    height: 64,
    elevation: 2, 
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
    elevation: 2,
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
    elevation: 2,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#808080',
  },

  buttonBackHome: {
    height: 64,
    elevation: 2,
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