import React, { useEffect, useState } from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { GET_LANGUAGE } from '../config/languages';
import { about as engAbout } from '../languages/english';
import { about as porAbout } from '../languages/portuguese';
import Header from '../components/Header';
import Article from '../components/Article';
import Loading from '../components/Loading';

export default function About() {
  const [languageScene, setLanguageScene] = useState<LanguageAboutProps>();
  const [indexLanguage, setIndexLanguage] = useState<number>(0);
  const [titleHeader, setTitleHeader] = useState('');

  useEffect(() => {
    GET_LANGUAGE()
    .then(languageData => {
      if (languageData) {
        if (languageData === 'english') {
          setLanguageScene(engAbout);
          setIndexLanguage(1);
          setTitleHeader('About');
        } else {
          setLanguageScene(porAbout);
          setIndexLanguage(0);
          setTitleHeader('Sobre');
        }
      }
    })
  });

  if (!languageScene) {
    return <Loading />;
  };

  return (
    <>
      <Header title={titleHeader} arrowLeft={true} />
      <ScrollView style={styles.container}>
        <View style={styles.containerAbout}>
          <View style={styles.title}>
            <Feather name='bookmark' size={24} />
            <Text style={styles.text}>{languageScene.title}</Text>
          </View>
          {
            languageScene.articles.map((article, index) => (
              <Article               
                key={index}
                index={index}
                article={article}
                indexLanguage={indexLanguage}
              />
            ))   
          }
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
    backgroundColor: '#F2F2F2',
  },

  title: {
    flexDirection: 'row', 
    justifyContent: 'flex-start', 
    alignItems: 'center',
  },
  
  text: {
    fontSize: 18, 
    marginLeft: 6,
  },
});