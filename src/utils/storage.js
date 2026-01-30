// src/utils/storage.js
import AsyncStorage from '@react-native-async-storage/async-storage';

const KEY = '@arbitrage_settings_v1';

export const saveSettings = async (data) => {
  try {
    const jsonValue = JSON.stringify(data);
    await AsyncStorage.setItem(KEY, jsonValue);
  } catch (e) {
    console.warn('Erreur sauvegarde', e);
  }
};

export const loadSettings = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem(KEY);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.warn('Erreur chargement', e);
    return null;
  }
};
