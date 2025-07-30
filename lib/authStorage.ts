// app/utils/authStorage.ts
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from 'expo-secure-store';

export const getStoredSession = async () => {
  const token = await SecureStore.getItemAsync('supabase_token');
  const user = await AsyncStorage.getItem('supabase_user');
  return token && user ? { token, user: JSON.parse(user) } : null;
};

export const clearStoredSession = async () => {
  await SecureStore.deleteItemAsync('supabase_token');
  await AsyncStorage.removeItem('supabase_user');
};
