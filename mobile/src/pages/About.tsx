import React, { useEffect, useState } from 'react';
import { ScrollView, View, Text, StyleSheet, Image, Linking } from 'react-native';
import { Feather } from '@expo/vector-icons';
import aboutQrCodeImg from '../images/about-qr-code.png';
import { RectButton } from 'react-native-gesture-handler';
import { GET_LANGUAGE } from '../config/languages';
import { about as engAbout } from '../languages/english';
import { about as porAbout } from '../languages/portuguese';

import Header from '../components/Header';

export default function About() {
  const [languageScene, setLanguageScene] = useState<LanguageAboutProps>();
  const [titleHeader, setTitleHeader] = useState('');

  useEffect(() => {
    GET_LANGUAGE()
    .then(languageData => {
      if (languageData) {
        if (languageData === 'english') {
          setLanguageScene(engAbout);
          setTitleHeader('About');
        } else {
          setLanguageScene(porAbout);
          setTitleHeader('Sobre');
        }
      }
    })
    .catch(error => {
      console.error(error);
      setLanguageScene(engAbout);
    });
  });

  return (
    <>
      <Header title={titleHeader} arrowLeft={true} />
      <ScrollView style={styles.container}>
        <View style={styles.containerAbout}>
          <View style={{flex: 1, alignItems:'center', paddingVertical: 16}}>
            <Text style={{fontWeight: 'bold', fontSize: 20, paddingHorizontal: 72, textAlign: 'center'}}>
              {languageScene?.title}
            </Text>
          </View>
          <Text style={[styles.subTitle, styles.justify]}>
            {languageScene?.paragraph_1}
          </Text>
          <Text style={[styles.subTitle, styles.justify]}>
            {languageScene?.paragraph_2}
          </Text>
          <Image 
            style={{
              alignSelf: 'center', 
              marginTop: 6,
              marginBottom: 9
            }} 
            source={aboutQrCodeImg} 
            width={300} 
            height={300} 
          />
          <Text style={[styles.subTitle, styles.justify]}>
            {languageScene?.paragraph_3}
          </Text>
          <Text style={[styles.subTitle, styles.justify]}>
            {languageScene?.paragraph_4}
          </Text>
          <Text style={[{fontSize: 20}]}>
            {languageScene?.reference}
          </Text>
          <RectButton style={[ styles.subTitle, {
            flex: 1,
            padding: 9,
            elevation: 2,
            borderRadius: 12,
            marginVertical: 12,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-start', 
            backgroundColor: '#FFFFFF'
          }]}>
            <Feather name='link' size={20} />
            <Text 
              style={{
                flex: 1,
                fontSize: 13,
                marginLeft: 8,
              }} 
              onPress={() => {
                Linking.openURL('https://olhardigital.com.br/2019/09/14/noticias/voce-sabe-o-que-e-o-qr-code-a-gente-explica/');
              }}
            >
              https://olhardigital.com.br/2019/09/14/noticias/voce-sabe-o-que-e-o-qr-code-a-gente-explica/
            </Text>          
          </RectButton>
        </View>
      </ScrollView>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  containerAbout: {
    padding: 20,
  },

  containerTitleIcon: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  containerTitle: {
    fontSize: 20,
    marginLeft: 12,
  },

  subTitle: {
    marginVertical: 9,
    fontSize: 16,
  },

  justify: {
    textAlign: 'justify',
  },
});