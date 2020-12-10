import React, { useEffect } from 'react';
import { StatusBar } from 'react-native';
import { GET_LANGUAGE, SET_LANGUAGE } from './src/config/languages';

import Routes from './src/routes';

export default function App() {

  useEffect(() => {
    GET_LANGUAGE()
    .then(languageData => {
      if (languageData) {
        if (languageData === 'english') {
          SET_LANGUAGE('english');
        } else {
          SET_LANGUAGE('portuguese');
        }
      } else {
        SET_LANGUAGE('english');
      }
    })
  },[]);

  return (
    <>
      <StatusBar />
      <Routes />
    </>
  );
}