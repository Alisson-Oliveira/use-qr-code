import AsyncStorage from '@react-native-async-storage/async-storage';

const AsyncStorageScannerQrCode = '@scanner.qr.code'; 

export const GET_STORAGE = async () => {
  try {
    const value = await AsyncStorage.getItem(AsyncStorageScannerQrCode);

    if (value === null) {
      const data: LinkProps[] = [];

      return data;
    }
    
    const data: LinkProps[] = JSON.parse(value);

    return data;
  } catch(error) {
    console.error(error);
    
    alert(`Não foi possível buscar os links`);
  }
}

export const SET_STORAGE = async (data: LinkProps[]) => {
  try {
    await AsyncStorage.setItem(AsyncStorageScannerQrCode, JSON.stringify(data));
  } catch (error) {
    console.error(error);
    
    alert(`Não foi possível atualizar os links`);
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
  } catch(error) {
    console.error(error);
    
    alert(`Não foi possível adicionar o link`);
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
  } catch(error) {
    console.error(error);
    
    alert(`Não foi possível remover o link`);
  }
}

export const REMOVE_ALL = async () => {
  try {
    await AsyncStorage.clear();    
  } catch (error) {
    console.error(error);

    alert(`Não foi possível remover todos os links`);
  }
}