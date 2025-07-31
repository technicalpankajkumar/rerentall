import { selectCurrentUser, setCredentials } from '@/store/feature/auth/slice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { usePathname, useRouter } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

export default function Index() {
  const user = useSelector(selectCurrentUser);
  const router = useRouter();
  const pathname = usePathname(); // ensures layout is mounted
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true); // delay render until load done

  useEffect(() => {
    const loadSession = async () => {
      try {
        const token = await SecureStore.getItemAsync('accessToken');
        const userStr = await AsyncStorage.getItem('user');
        if (token && userStr) {
          const user = JSON.parse(userStr);
          dispatch(setCredentials({ session: { access_token: token }, user }));
        }
      } catch (error) {
        console.log('Session load error:', error);
      } finally {
        setLoading(false); // done loading
      }
    };
    loadSession();
  }, [dispatch]);

  useEffect(() => {
    if (!loading && !user && pathname === '/') {
      router.replace('/(renter)/home');
    }
  }, [user, loading]);

  if (loading || !user) return null;

  return (
   <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-xl font-bold text-blue-500">
        Welcome to Nativewind!
      </Text>
    </View>
  );
}
