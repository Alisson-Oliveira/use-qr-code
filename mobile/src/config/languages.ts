import AsyncStorage from '@react-native-async-storage/async-storage';

const AsyncStorageScannerQrCode = '@scanner.qr.code:language'; 

export const GET_LANGUAGE = async () => {
  try {
    const value = await AsyncStorage.getItem(AsyncStorageScannerQrCode);

    if (value === null) {
      return 'english';
    }
    
    const data: string = JSON.parse(value);

    return data;
  } catch(error) {
    console.error(error);
    
    alert(`Não foi possível buscar os links`);
  }
}

export const SET_LANGUAGE = async (data: string) => {
  try {
    await AsyncStorage.setItem(AsyncStorageScannerQrCode, JSON.stringify(data));
  } catch (error) {
    console.error(error);
    
    alert(`Não foi possível atualizar os links`);
  }
}
