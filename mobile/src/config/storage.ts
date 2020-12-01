import AsyncStorage from '@react-native-async-storage/async-storage';

const AsyncStorageScannerQrCode = '@scanner.qr.code'; 

interface LinkProps {
  link: string,
}

export const GET_STORAGE = async () => {
  try {
    const value = await AsyncStorage.getItem(AsyncStorageScannerQrCode);

    if (value === null) {
      const data: LinkProps[] = [];

      return data;
    }
    
    const data: LinkProps[] = JSON.parse(value);

    return data;
  } catch(e) {
    console.log(e);
  }
}

export const SET_STORAGE = async (data: LinkProps[]) => {
  try {
    console.log("SET_LINK: " + data);

    await AsyncStorage.setItem(AsyncStorageScannerQrCode, JSON.stringify(data));
  } catch (e) {
    console.log(e);
  }
}

export const ADD_LINK = async (link: LinkProps) => {
  try {
    const value = await AsyncStorage.getItem(AsyncStorageScannerQrCode);

    if (value === null) {
      return ;
    } 
    
    const responseData: LinkProps[] = JSON.parse(value);

    const data = [
      ...responseData,
      link
    ];

    SET_STORAGE(data);
  } catch(e) {
    console.log(e);
  }
}

export const REMOVE_LINK = async (link: string) => {
  try {
    const value = await AsyncStorage.getItem(AsyncStorageScannerQrCode);

    if (value === null) {
      return ;
    } 
    
    const responseData: LinkProps[] = JSON.parse(value);

    const data = responseData.filter(response => response.link !== link);

    SET_STORAGE(data);
  } catch(e) {
    console.log(e);
  }
}