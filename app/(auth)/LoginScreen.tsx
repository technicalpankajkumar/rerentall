// app/(auth)/login.tsx
import { useLoginMutation } from '@/api';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Button, Text, TextInput, View } from 'react-native';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [login, { isLoading, error }] = useLoginMutation();
  const router = useRouter();

  const handleLogin = async () => {
    try {
      await login({ email, password }).unwrap();
      router.replace('/'); // Redirect to home after login
    } catch (err) {
      console.error('Login failed', err);
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} />
      <TextInput placeholder="Password" secureTextEntry value={password} onChangeText={setPassword} />
      <Button title="Login" onPress={handleLogin} />
      {error && <Text style={{ color: 'red' }}>Login failed</Text>}
    </View>
  );
}
