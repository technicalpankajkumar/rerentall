import { setCredentials } from '@/store/feature/auth/slice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { useDispatch } from 'react-redux';

export default function Index() {
  const router = useRouter();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeApp = async () => {
      try {
        // Load session
        const token = await SecureStore.getItemAsync('accessToken');
        const userStr = await AsyncStorage.getItem('user');

        if (token && userStr) {
          dispatch(setCredentials({ session: { access_token: token }, user: JSON.parse(userStr) }));
        }

        // Check onboarding
        const hasSeenOnboarding = await AsyncStorage.getItem('hasSeenOnboarding');

        if (hasSeenOnboarding) {
          return router.replace('/(onboarding)');
        }

        // If not logged in, go to login
        if (!token || !userStr) {
          return router.replace('/(auth)/loginScreen');
        }

        // If logged in, redirect to renter home
        router.replace('/(renter)/home');
      } catch (error) {
        router.replace('/(auth)/loginScreen');
      } finally {
        setLoading(false);
      }
    };

    initializeApp();
  }, []);

  if (loading) {
    return (      
      <View className="flex-1 items-center justify-center bg-white">
        <ActivityIndicator size="large" />
      </View>
    );
  }

  // You will rarely reach here as router.replace() is immediate
  return null;
}
