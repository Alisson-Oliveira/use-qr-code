import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, ScrollView, Linking, Share } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { GET_STORAGE, REMOVE_ALL, REMOVE_LINK } from '../config/storage';

export default function Tools() {
  const [links, setLinks] = useState<LinkProps[]>([]);
  const navigation = useNavigation();
  
  useEffect(() => { 
    GET_STORAGE().then(response => {
      if (response !== undefined) {
        setLinks(response);
      }
    });
  },[links]);

  function handleToScanQrCode() {
    return navigation.navigate('ReaderQr');
  }

  function handleToAbout() {
    return navigation.navigate('About');
  }

  function handleToContactMe() {
    return navigation.navigate('ContactMe');
  }

  function handleRemoveAll() {
    REMOVE_ALL();
  }

  function handleAccessLink(link: string) {
    Linking.openURL(link)
      .catch(err => {
        console.error(err);
        alert("Couldn't load page");
      });
  };

  function handleShareLink(link: string) {
    try {
      Share.share({ message: link })
        .catch(err => {
          console.error(err);
          alert("Couldn't share");
        });
    } catch (error) {
      console.error(error);
    }
  }

  function handleRemoveLink(link: string) {
    REMOVE_LINK(link);
  } 

  return (
    <ScrollView style={styles.container}>
      <View style={styles.tools}>        
        <View style={styles.containerButtons}>
          <Text style={styles.title}>Tools</Text>
          <RectButton style={styles.button} onPress={handleToScanQrCode}>
            <Feather style={styles.icon} name="maximize" size={32} />
            <Text style={styles.subTitle}>Scan QR Code</Text>
          </RectButton>
          <RectButton style={styles.button} onPress={handleToAbout}>
            <Feather style={styles.icon} name="info" size={32} />
            <Text style={styles.subTitle}>About</Text>
          </RectButton>
          <RectButton style={styles.button} onPress={handleToContactMe}>
            <Feather style={styles.icon} name="mail" size={32} />
            <Text style={styles.subTitle}>Contact Me</Text>
          </RectButton>
        </View>
        <View style={styles.containerCleanAll}>
          <Text style={styles.title}>Recently Opened</Text> 
          <RectButton style={styles.containerButtonCleanAll} onPress={handleRemoveAll}>
            <Text style={styles.titleCleanAll}>Clean All</Text>
            <Feather name="trash-2" size={16} color='#FF4040' />
          </RectButton>
        </View>
        <View style={styles.links}>
          {
            links.length !== 0 ? (
              links.map((response, index) => (
                <View key={index} style={styles.containerLink}> 
                  <RectButton style={styles.link} onPress={() => handleAccessLink(response.link)}>
                    <Feather style={styles.icon} name="link" size={27} />
                    <Text style={styles.dominio}>{response.link}</Text>
                  </RectButton>
                  <RectButton onPress={() => handleShareLink(response.link)}>
                    <Feather style={[styles.iconShareClose, { marginRight: 6 }]} name="share-2" size={20} />
                  </RectButton>
                  <RectButton onPress={() => handleRemoveLink(response.link)}>
                    <Feather style={styles.iconShareClose} name="x" size={20} />
                  </RectButton>
                </View>
              ))
            ) : (
              <View style={styles.containerEmpty}>
                <Feather name="alert-triangle" size={20} color='#000000' />
                <Text>Has no link available :(</Text>
              </View>
            )
          }
        </View>
      </View>  
    </ScrollView>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
  },

  tools: {
    width: '100%',
    padding: 24,
  },

  containerButtons: {
    marginBottom: 12,
  },

  title: {
    fontSize: 18,
  }, 

  button: {
    height: 64,
    flexDirection: 'row',
    alignItems: 'center',
  },

  icon: {
    marginRight: 12,
  },

  containerCleanAll: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  containerButtonCleanAll: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },

  titleCleanAll: {
    fontSize: 16,
    marginRight: 3,
    color: '#FF4040',
  },

  subTitle: {
    fontSize: 16,
  },

  links: {
    marginTop: 12,
  },

  containerEmpty: {
    padding: 9,
    height: 64,
    elevation: 3,
    marginTop: 12,
    borderRadius: 12,
    alignItems: 'center', 
    backgroundColor: '#FFFFFF',
    justifyContent: 'space-between', 
  },

  containerLink: {
    padding: 6,
    elevation: 3,
    marginTop: 12,
    borderRadius: 12,
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor: '#FFFFFF',
    justifyContent: 'space-between' 
  },

  link: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },

  dominio: {
    flex: 1,
    fontSize: 16,
    paddingRight: 12,
  },

  iconShareClose: {
    color: '#808080',
    justifyContent: 'flex-end', 
  },
});