import React, { useState, useEffect } from 'react';
import { Text, View, ScrollView, StyleSheet, Linking } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';
import Header from '../components/Header';
import { useRoute } from '@react-navigation/native';
import Loading from '../components/Loading';

interface ArticleParams {
  article: {
    title: string,
    paragraph_1: string,
    paragraph_2: string,
    paragraph_3: string,
    paragraph_4: string,
    reference: string,
  },
  titleHeader: string,
};

export default function Details() {
  const [detailsArticle, setDetailsArticle] = useState<ArticleProps>();
  const [titleHeader, setTitleHeader] = useState('Details');

  const route = useRoute();
  const params = route.params as ArticleParams;

  useEffect(() => {
    setDetailsArticle(params.article);
    setTitleHeader(params.titleHeader);
  },[]);

  function handleToLink(link: string) {
    Linking.openURL(link);  
  };

  if (!detailsArticle) {
    return <Loading />;
  };

  return (
    <>
      <Header title={titleHeader} arrowLeft={true} />
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.details}>
            <Text style={styles.title}>
              {detailsArticle.title}
            </Text>
            <Text style={styles.paragraph}>
              {detailsArticle.paragraph_1}
            </Text>
            <Text style={styles.paragraph}>
              {detailsArticle.paragraph_2}
            </Text>
            <Text style={styles.paragraph}>
              {detailsArticle.paragraph_3}
            </Text>
            <Text style={styles.paragraph}>
              {detailsArticle.paragraph_4}
            </Text>
            <Text style={styles.reference}>
              Reference
            </Text>
            <RectButton style={styles.buttonLink} 
              onPress={() => {
                handleToLink(detailsArticle.reference)
              }}
            >
              <Feather name='link-2' size={20} color='#0099FF' />
              <Text style={styles.buttonText}>
                {detailsArticle.reference}
              </Text>
            </RectButton>
          </View>
        </ScrollView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  details: {
    backgroundColor: '#F2F2F2', 
    padding: 24,
  },

  title: {
    fontSize: 20, 
    fontWeight: 'bold', 
    alignSelf: 'center', 
    textAlign: 'center',
  },

  paragraph: {
    fontSize: 16, 
    marginTop: 12,
  },
  
  reference: {
    fontSize: 20, 
    fontWeight: 'bold', 
    marginTop: 12,
  },

  buttonLink: {
    marginTop: 12, 
    width: '100%', 
    height: 64 , 
    backgroundColor: '#FFFFFF', 
    borderRadius: 12, 
    padding: 12, 
    elevation: 1, 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center',
  },

  buttonText: {
    width: '90%', 
    fontSize: 14, 
    marginLeft: 9, 
    color: '#0099FF',
    textAlign: 'center',
  },
});