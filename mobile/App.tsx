import React, { useEffect } from 'react';
import { StatusBar } from 'react-native';
import { SET_LANGUAGE } from './src/config/languages';

import Routes from './src/routes';

export default function App() {

  useEffect(() => {
    SET_LANGUAGE('english');
  },[]);

  return (
    <>
      <StatusBar />
      <Routes />
    </>
  );
}