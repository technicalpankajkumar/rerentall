import { selectCurrentUser } from '@/store/feature/auth/slice';
import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import { Text, View } from 'react-native';
import { useSelector } from 'react-redux';

export default function Home() {
  const user = useSelector(selectCurrentUser);
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.replace('/login');
    }
  }, [user]);

  if (!user) return null;

  return (
    <View style={{ padding: 20 }}>
      <Text>Welcome, {user.email}!</Text>
    </View>
  );
}
