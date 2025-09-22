import AsyncStorage from '@react-native-async-storage/async-storage';

const getStorageItem = async (key: string) => AsyncStorage.getItem(key);
const setStorageItem = async (key: string, value: string) =>
  AsyncStorage.setItem(key, value);
const removeStorageItem = async (key: string) => AsyncStorage.removeItem(key);
const removeMultiStorageItem = async (keys: string[]) =>
  AsyncStorage.multiRemove(keys);

export const StorageHelper = {
  getStorageItem,
  setStorageItem,
  removeStorageItem,
  removeMultiStorageItem,
};
