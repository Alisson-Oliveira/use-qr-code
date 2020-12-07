import React from 'react';
import { ScrollView, View, Text, StyleSheet, Image, Linking } from 'react-native';
import { Feather } from '@expo/vector-icons';
import aboutQrCodeImg from '../images/about-qr-code.png';
import { RectButton } from 'react-native-gesture-handler';

export default function About() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.containerAbout}>

        <View style={{flex: 1, alignItems:'center', paddingVertical: 16}}>
          <Text style={{fontWeight: 'bold', fontSize: 20, paddingHorizontal: 72, textAlign: 'center'}}>
            Do you know what the QR Code is? We explain
          </Text>
        </View>

        <Text style={[styles.subTitle, styles.justify]}>
          Quick response code. This is the full name of the QR Code (Quick Response Code). Although he is being noticed - and adopted - only now, he is 25 years old: he was created in 1994 by Denso-Wave (a Toyota Group company) in Japan.
        </Text>

        <Text style={[styles.subTitle, styles.justify]}>
          O The QR Code is an evolution of the barcode, which has existed since 1970 and revolutionized the identification of products. It consists of a 2D graphic (the common barcode uses only one dimension, the horizontal, while the QR uses the vertical and the horizontal) that can be read by the cameras of most cell phones (some models still require specific applications for this).
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
          When Denso-Wave created it, it did it to facilitate the classification of car parts. Soon, however, it became clear that it could be useful in other segments. It was then improved and started to be used to offer more information and even exclusive content - since it has a high data storage capacity.
        </Text>

        <Text style={[styles.subTitle, styles.justify]}>
          As it is a visual code, it only needs to be read completely. That is, it can be in digital form, on a device, or physical, printed. One of its advantages is to take consumers directly wherever they want to go. In other words, it eliminates the need to enter addresses in smartphone browsers (a task that can be arduous on some devices).
        </Text>

        <Text style={[{fontSize: 20}]}>
          Reference
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