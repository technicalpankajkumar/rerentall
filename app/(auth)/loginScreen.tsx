import { useLoginMutation } from '@/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Text } from '@/components/ui/text';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import { useFormik } from 'formik';
import { Lock, Mail, MessageCircle } from 'lucide-react-native';
import { useColorScheme } from 'nativewind';
import { useEffect, useState } from 'react';
import {
  Alert,
  ScrollView,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import * as Yup from 'yup';

export default function SignInScreen() {
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const { width } = useWindowDimensions();
  const isTabletOrWeb = width > 768;
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';

  const router = useRouter();
  const [login, { isLoading }] = useLoginMutation();

  // Prefill email if remembered
  useEffect(() => {
    (async () => {
      const savedEmail = await AsyncStorage.getItem('rememberedEmail');
      const savedPassword = await SecureStore.getItemAsync('rememberedPassword');
      if (savedEmail) {
        formik.setFieldValue('email', savedEmail);
        setRememberMe(true);
      }
      if (savedPassword) {
        formik.setFieldValue('password', savedPassword);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // auto login
  //   useEffect(() => {
  //   (async () => {
  //     const savedEmail = await AsyncStorage.getItem('rememberedEmail');
  //     const savedPassword = await SecureStore.getItemAsync('rememberedPassword');
  //     if (savedEmail && savedPassword) {
  //       try {
  //         await login({ email: savedEmail, password: savedPassword }).unwrap();
  //         router.replace('/(renter)/home');
  //       } catch (e) {
  //         console.log("Auto-login failed");
  //       }
  //     }
  //   })();
  // }, []);

  const formik = useFormik({
    initialValues: { email: '', password: '' },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email').required('Required'),
      password: Yup.string().min(6, 'Min 6 characters').required('Required'),
    }),
    onSubmit: async values => {
      try {
        if (rememberMe) {
          await AsyncStorage.setItem('rememberedEmail', values.email);
          await SecureStore.setItemAsync('rememberedPassword', values.password);
        } else {
          await AsyncStorage.removeItem('rememberedEmail');
          await SecureStore.deleteItemAsync('rememberedPassword');
        }
        await login({ email: values.email, password: values.password }).unwrap();
        router.replace('/(renter)/home');
      } catch (err) {
        Alert.alert('Login Failed', 'Invalid credentials');
      }
    },
  });

  return (
    <LinearGradient
      colors={isDark ? ['#0f172a', '#1e293b'] : ['#f8fafc', '#e2e8f0']}
      className="flex-1"
    >
      <ScrollView contentContainerClassName="flex-grow px-6 pt-20 pb-8">
        {/* Header */}
        <View className="items-center mb-8">
          <View className="w-16 h-16 bg-white dark:bg-gray-800 rounded-xl justify-center items-center shadow">
            <MessageCircle size={32} color={isDark ? '#facc15' : '#4F46E5'} />
          </View>
          <Text className="text-xl font-bold text-gray-900 dark:text-white mt-4">
            Sign in to Freedcamp Chat
          </Text>
          <Text className="text-base text-gray-600 dark:text-gray-400">
            First time here?
            <Text className="text-indigo-600 font-semibold"> Sign Up</Text>
          </Text>
        </View>

        {/* Form */}
        <View className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-lg">
          {/* Email */}
          <Input
            size='md'
            prefix={<Mail size={20} color={isDark ? '#9ca3af' : '#6b7280'} />}
            placeholder="email@example.com"
            placeholderTextColor="#9ca3af"
            value={formik.values.email}
            onChangeText={formik.handleChange('email')}
            onBlur={formik.handleBlur('email')}
            keyboardType="email-address"
            autoCapitalize="none"
            error={formik.touched.email && formik.errors.email}
          />
          {/* Password */}
          <Input
            prefix={<Lock size={20} color={isDark ? '#9ca3af' : '#6b7280'} />}
            placeholder="Password"
            placeholderTextColor="#9ca3af"
            value={formik.values.password}
            onChangeText={formik.handleChange('password')}
            onBlur={formik.handleBlur('password')}
            error={formik.touched.password && formik.errors.password}
            secureToggle
            secureTextEntry
          />

          {/* Remember Me & Biometric */}
          <View className="flex-1 justify-between py-4">
            <TouchableOpacity
              className="flex-row items-center"
              onPress={() => setRememberMe(!rememberMe)}
              activeOpacity={0.7}
            >
              <View
                className={`w-5 h-5 border border-gray-300 dark:border-gray-600 rounded mr-2 items-center justify-center ${rememberMe ? 'bg-indigo-600' : 'bg-transparent'
                  }`}
              >
                {rememberMe && <Text className="text-white text-xs">✓</Text>}
              </View>
              <Text className="text-gray-600 dark:text-gray-300 text-sm">
                Remember Me
              </Text>
            </TouchableOpacity>
            {/* <View className="flex-row items-center">
              <Text className="text-gray-600 dark:text-gray-300 text-sm mr-2">
                Accept sign in with TouchFace ID
              </Text>
              <Fingerprint size={20} color="#22c55e" />
            </View> */}
          </View>

          {/* Submit Button */}
          <Button onPress={formik.handleSubmit}
            disabled={isLoading} variant="default" size="sm">
            {isLoading ? 'Signing In...' : 'Sign In'}
          </Button>

        </View>
      </ScrollView>
    </LinearGradient>
  );
}