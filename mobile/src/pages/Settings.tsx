import React, { useEffect, useState } from 'react';
import { Feather } from '@expo/vector-icons';
import { View, Text, StyleSheet, Linking, ScrollView } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { SET_LANGUAGE, GET_LANGUAGE } from '../config/languages';
import { settings as engSettings } from '../languages/english';
import { settings as porSettings } from '../languages/portuguese';

import Header from '../components/Header';

export default function Settings() {
  const [language, setLanguage] = useState('english');
  const [titleHeader, setTitleHeader] = useState('');
  const [languageScene, setLanguageScene] = useState<LanguageSettingsProps>();

  useEffect(() => {
    GET_LANGUAGE()
      .then(languageData => {
        if (languageData) {
          setLanguage(languageData);
          if (languageData === 'english') {
            setLanguageScene(engSettings);
            setTitleHeader('Settings');
          } else {
            setLanguageScene(porSettings);
            setTitleHeader('Configurações');
          }
        }
      })
      .catch(error => {
        console.error(error);
        setLanguageScene(engSettings);
      });
  }, [language]);

  async function handleToSendMail() {
    await Linking.openURL('mailto:alsrokn@gmail.com?subject=Suporte App Use Qr Code');
  };

  async function handleToRepository() {
    await Linking.openURL('https://github.com/Alisson-Oliveira/use-qr-code');
  };

  async function handleAlterLanguage(language: string) {
    setLanguage(language);
    await SET_LANGUAGE(language);
  };

  return (
    <>
      <Header title={titleHeader} arrowLeft={true} />
      <ScrollView style={styles.container}>
        <View style={styles.settings}>
          <View style={styles.item}>
            <View style={styles.containerTitleIcon}>
              <Feather name='type' size={20} color='#000000'/>
              <Text style={styles.containerTitle}>{languageScene?.language}</Text>
            </View>
            <View style={styles.languages}>
              <RectButton style={styles.chooseLanguage} onPress={() => handleAlterLanguage('english')}>
                { 
                  language === 'english' ? (
                    <Feather name='check-circle' size={18} color='#0099FF'/>
                  ) : (
                    <Feather name='circle' size={18} color='#000000'/>
                  ) 
                }
                {
                  language === 'english' ? (
                    <Text style={[styles.subTitle, { color: '#0099FF' }]}>{languageScene?.english}</Text>
                  ) : (
                    <Text style={[styles.subTitle, { color: '#000000' }]}>{languageScene?.english}</Text>
                  ) 
                }              
              </RectButton>
              <RectButton style={styles.chooseLanguage} onPress={() => handleAlterLanguage('portuguese')}>
                {
                  language === 'portuguese' ? (
                    <Feather name='check-circle' size={18} color='#0099FF'/>
                  ) : (
                    <Feather name='circle' size={18} color='#000000'/>
                  ) 
                }
                {
                  language === 'portuguese' ? (
                    <Text style={[styles.subTitle, { color: '#0099FF' }]}>{languageScene?.portuguese}</Text>
                  ) : (
                    <Text style={[styles.subTitle, { color: '#000000' }]}>{languageScene?.portuguese}</Text>
                  ) 
                }
              </RectButton>
            </View>
          </View>
          <View style={styles.item}>
            <View style={styles.containerItem}>
              <View style={styles.containerTitleIcon}>
                <Feather name='edit-3' size={20} />
                <Text style={styles.containerTitle}>{languageScene?.support}</Text>            
              </View>
              <View style={{ marginTop: 6 }}> 
                <Text style={styles.subTitle}>- {languageScene?.idea}</Text>
                <Text style={styles.subTitle}>- {languageScene?.bug}</Text>
              </View>
            </View>
            <View style={styles.containerSend}>
              <Text style={styles.textContactMe}>{languageScene?.contact}</Text>
              <RectButton style={styles.containerButtonSend} onPress={handleToSendMail}>
                <Text style={styles.TextSend}>{languageScene?.send}</Text>
                <Feather name='send' size={20} color='#0099FF' />
              </RectButton>
            </View>
          </View>
          <View style={styles.item}>
            <View style={styles.containerTitleIcon}>
              <Feather name='github' size={20} />
              <Text style={styles.containerTitle}>{languageScene?.repository}</Text>
            </View>
            <RectButton style={styles.containerLink} onPress={handleToRepository}>
              <Feather name='link-2' size={20} color='#0099FF'/>
              <Text style={styles.titleLink}>https://github.com/Alisson-Oliveira/use-qr-code</Text>
            </RectButton>
          </View>
          <View style={[styles.item, styles.Version]}>
            <View style={styles.containerTitleIcon}>
              <Feather name='package' size={20} />
              <Text style={styles.containerTitle}>{languageScene?.version}</Text>
            </View>
            <Text style={styles.subTitle}>1.0.4</Text>
          </View>
        </View>
      </ScrollView>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  settings: {
    flex: 1,
    padding: 24,
    backgroundColor: '#F2F2F2'
  },

  item: {
    backgroundColor: '#FFFFFF', 
    borderRadius: 12, 
    padding: 12, 
    marginBottom: 12, 
    elevation: 1,
  },

  languages: {
    paddingTop: 12,
    paddingLeft: 12,
  },

  chooseLanguage: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },

  containerItem: {
    marginBottom: 12,
  },

  containerTitleIcon: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  containerTitle: {
    color: '#000000',
    fontSize: 20,
    marginLeft: 12,
  },

  subTitle: {
    margin: 9,
    fontSize: 16,
  },

  containerLink: {
    padding: 12,
    marginTop: 9,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },

  titleLink: {
    fontSize: 13,
    marginLeft: 12,
    color: '#0099FF',
  },

  containerSend: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  textContactMe: {
    fontSize: 18,
    marginLeft: 12,
  },

  containerButtonSend: {
    padding: 12,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    backgroundColor: '#FFFFFF',    
  },

  TextSend: {
    fontSize: 16,
    marginRight: 6,
    color: '#0099FF',
  },

  Version: {
    marginBottom: 0,
  },
});