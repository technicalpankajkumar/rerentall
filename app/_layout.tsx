import { setCredentials } from '@/store/feature/auth/slice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Stack } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import { useEffect } from 'react';
import { Provider, useDispatch } from 'react-redux';
import { store } from '../store';

export default function Layout() {
  const dispatch = useDispatch();

  useEffect(() => {
    const loadSession = async () => {
      const token = await SecureStore.getItemAsync('accessToken');
      const userStr = await AsyncStorage.getItem('user');
      if (token && userStr) {
        const user = JSON.parse(userStr);
        dispatch(setCredentials({ session: { access_token: token }, user }));
      }
    };
    loadSession();
  }, [dispatch]);

  return (
    <Provider store={store}>
      <Stack screenOptions={{ headerShown: false }} />
    </Provider>
  );
}
