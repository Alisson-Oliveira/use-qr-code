import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

import olharDigitalImg from '../images/articles/olhar_digital_photo.jpg';
import tectudoImg from '../images/articles/techtudo_photo.jpg';
import tecnoblogImg from '../images/articles/tecnoblog_photo.jpg';
import canaltechImg from '../images/articles/canaltech_photo.jpg';

interface ComponentArticleProps {
  index: number,
  indexLanguage: number,
  article: ArticleDataProps,
};

export default function Article({ index, indexLanguage, article }: ComponentArticleProps) {
  const navigation = useNavigation();

  function handleToDetails(article: ArticleProps, titleHeader: string) {
    navigation.navigate('Details', { article, titleHeader });
  };

  function showImage(index: number){
    if (index === 0) {
      return olharDigitalImg;
    }
    if (index === 1) {
      return tectudoImg;
    }
    if (index === 2) {
      return tecnoblogImg;
    }
    if (index === 3) {
      return canaltechImg;
    }
  };

  return (
    <RectButton 
      onPress={() => {
        handleToDetails(article.article[indexLanguage], article.title)
      }} 
      style={styles.button}
    >
      <Image 
        resizeMode='cover' 
        source={showImage(index)} 
        style={styles.image}
      />
      <View style={styles.details}>
        <Text style={styles.title}>{article.title}</Text>
        <Text style={styles.author}>{article.author}</Text>
      </View>
    </RectButton>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#FFFFFF', 
    height: 128, 
    marginTop: 12, 
    borderRadius: 12, 
    elevation: 1, 
    padding: 12, 
    flexDirection: 'row',
  },

  image: {
    borderRadius: 12, 
    marginRight: 12, 
    height: 104, 
    width: 104,
  },

  details: {
    flexDirection: 'column',
  },

  title: {
    fontSize: 24, 
    fontWeight: 'bold', 
  },

  author: {
    fontSize: 14,
  },
});