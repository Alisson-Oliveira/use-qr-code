import React from 'react';
import { View, Text, StyleSheet, Linking } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { RectButton } from 'react-native-gesture-handler';

export default function ContactMe() {

  async function handleToSendMail() {
    await Linking.openURL('mailto:alsrokn@gmail.com?subject=Suporte App Use Qr Code');
  }

  async function handleToRepository() {
    await Linking.openURL('https://github.com/Alisson-Oliveira/use-qr-code');
  }

  return (
    <View style={styles.container}>
      <View style={styles.containerOptions}>
        <View style={styles.containerItem}>
          <View style={styles.containerTitleIcon}>
            <Feather name='package' size={20} />
            <Text style={styles.containerTitle}>Version</Text>
          </View>
          <Text style={styles.subTitle}>1.0.2</Text>
        </View>
        <View style={styles.containerItem}>
          <View style={styles.containerTitleIcon}>
            <Feather name='github' size={20} />
            <Text style={styles.containerTitle}>Repository</Text>
          </View>
          <RectButton style={styles.containerLink} onPress={handleToRepository}>
            <Feather name='link' size={20} />
            <Text style={styles.titleLink}>https://github.com/Alisson-Oliveira/use-qr-code</Text>
          </RectButton>
        </View>
        <View style={styles.containerItem}>
          <View style={styles.containerTitleIcon}>
            <Feather name='edit-3' size={20} />
            <Text style={styles.containerTitle}>Suporte</Text>            
          </View>
          <View>
            <Text style={styles.subTitle}>- Idea to add to the app?</Text>
            <Text style={styles.subTitle}>- Any bug?</Text>
          </View>
        </View>
        <View style={styles.containerSend}>
          <Text style={styles.textContactMe}>Please, contact me :)</Text>
          <RectButton style={styles.containerButtonSend} onPress={handleToSendMail}>
            <Text style={styles.TextSend}>Send</Text>
            <Feather name='send' size={20} color='#0099FF' />
          </RectButton>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  containerOptions: {
    flex: 1,
    padding: 24,
  },

  containerItem: {
    marginBottom: 12,
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
    margin: 9,
    fontSize: 16,
  },

  justify: {
    textAlign: 'justify',
  },

  containerLink: {
    padding: 12,
    marginTop: 9,
    elevation: 2,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },

  titleLink: {
    fontSize: 13,
    marginLeft: 12,
  },

  containerSend: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  textContactMe: {
    fontSize: 20,
  },

  containerButtonSend: {
    padding: 12,
    elevation: 2,
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
});