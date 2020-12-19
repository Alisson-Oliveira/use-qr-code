import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet, Image } from 'react-native';
import { RectButton, ScrollView } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';
import QRCode from 'react-native-qrcode-svg';

import { GET_LANGUAGE } from '../config/languages';
import { create as engCreate } from '../languages/english';
import { create as porCreate } from '../languages/portuguese';
 
import Header from '../components/Header';
import Loading from '../components/Loading';

export default function CreateQr() {
  const [languageScene, setLanguageScene] = useState<LanguageCreateProps>();
  const [qrcode, setQrcode] = useState('Use QR Code');
  const [value, setValue] = useState('');
  const [generate, setGenerate] = useState(false);
  const [options, setOptions] = useState(false);

  useEffect(() => {
    GET_LANGUAGE()
    .then(languageData => {
      if (languageData) {
        if (languageData === 'english') {
          setLanguageScene(engCreate);
        } else {
          setLanguageScene(porCreate);
        }
      }
    })
    .catch(error => {
      console.error(error);
      setLanguageScene(engCreate);
    });
  },[]);

  function handleGenerateQrCode(data: string) {
    if (data) {
      setQrcode(data);
      setOptions(true);
    }
  };

  function handleEditQrCode() {
    setValue('');
    setOptions(false);
  };

  if (!languageScene) {
    return <Loading />
  };

  return (
    <>
      <Header title={languageScene.create} arrowLeft={true} />
      <ScrollView style={styles.container}>
        <View style={styles.createQr}>
          <View>
            <Text style={styles.text}>{languageScene.text}</Text>
            <TextInput 
              style={styles.inputValue} 
              placeholder='Ex: https://www.useqrcode.com/' 
              onChangeText={setValue} 
              value={value}
            />
            <RectButton 
              onPress={() => handleGenerateQrCode(value)} 
              style={styles.buttonGenerate}
            > 
              <Text 
                style={[styles.buttonText, { 
                  color: value !== '' ? '#258E25' : '#808080'
                }]}
              >
                {languageScene.generate}
              </Text>
              <Feather 
                name='file-plus' 
                size={20} 
                color={value !== '' ? '#258E25' : '#808080'}
              />
            </RectButton>

          </View>
          <View style={styles.containerQr}>
            {
              !generate && (
                <View style={styles.backgroundQr}>
                  <QRCode 
                    value={qrcode === '' ? 'Use QR Code' : qrcode}
                    size={256}
                  />
                </View>
              ) 
            }
          </View>
          { 
            options ? (
              <>
                <RectButton 
                  onPress={handleEditQrCode} 
                  style={styles.buttonType}
                > 
                  <Text style={styles.buttonText}>{languageScene.new}</Text>
                  <Feather 
                    name='edit' 
                    size={20} 
                    color='#258E25'
                  />
                </RectButton>
                <RectButton 
                  onPress={() => alert(languageScene.comingSoon)} 
                  style={styles.buttonType}
                > 
                  <Text style={styles.buttonText}>{languageScene.share}</Text>
                  <Feather 
                    name='link-2' 
                    size={20} 
                    color='#258E25'
                  />
                </RectButton>
                <RectButton 
                  onPress={() => alert(languageScene.comingSoon)} 
                  style={styles.buttonType}
                > 
                  <Text style={styles.buttonText}>{languageScene.download}</Text>
                  <Feather 
                    name='download' 
                    size={20} 
                    color='#258E25'
                  />
                </RectButton>
              </>
            ) : (
              <>
                <Text style={styles.textInfo}>{languageScene.about_1}</Text>
                <Text style={styles.textInfo}>{languageScene.about_2}</Text>
              </>
            )
          }
        </View>
      </ScrollView>
    </>
  )
}

const styles = StyleSheet.create({
  text: {
    fontSize: 16, 
    marginBottom: 12,
  },

  container: {
    flex: 1,
  },

  createQr: {
    padding: 24, 
    backgroundColor: '#F2F2F2',
  },

  inputValue: {
    backgroundColor: '#FFFFFF', 
    width: '100%', 
    height: 54, 
    padding: 12, 
    fontSize: 16, 
    elevation: 1, 
    borderRadius: 12, 
    marginBottom: 12,
  },

  buttonGenerate: {
    marginBottom: 12, 
    width: 89, 
    height: 24, 
    flexDirection: 'row', 
    justifyContent: 'center', 
    alignItems: 'center', 
    borderRadius: 18, 
    alignSelf: 'flex-end',
  },

  buttonText: {
    fontSize: 16, 
    color: '#258E25', 
    marginRight: 6,
  },

  containerQr: {
    height: 360, 
    justifyContent: 'center', 
    alignItems: 'center',
  },

  backgroundQr: {
    backgroundColor: '#FFFFFF', 
    width: 280, 
    height: 280, 
    justifyContent: 'center', 
    alignItems: 'center', 
    borderRadius: 12, 
    elevation: 1,
  },

  textInfo: {
    fontSize: 16,
    color: '#000000',
  },

  buttonType: {
    marginTop: 12,
    backgroundColor: '#FFFFFF', 
    width: '90%', 
    height: 54, 
    flexDirection: 'row', 
    justifyContent: 'center', 
    alignItems: 'center', 
    borderRadius: 12, 
    alignSelf: 'center', 
    elevation: 1,
  },
});