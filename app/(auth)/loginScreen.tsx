import { useLoginMutation } from '@/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import { useFormik } from 'formik';
import { Eye, EyeOff, Lock, Mail, MessageCircle } from 'lucide-react-native';
import { useColorScheme } from 'nativewind';
import { useEffect, useState } from 'react';
import {
  Alert,
  ScrollView,
  Text,
  TextInput,
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
          <View className="flex-row items-center border border-gray-300 dark:border-gray-700 rounded-xl px-4 py-3 bg-gray-50 dark:bg-gray-800 mb-2">
            <Mail size={20} color={isDark ? '#9ca3af' : '#6b7280'} />
            <TextInput
              className="flex-1 ml-3 text-gray-800 dark:text-white"
              placeholder="email@example.com"
              placeholderTextColor="#9ca3af"
              value={formik.values.email}
              onChangeText={formik.handleChange('email')}
              onBlur={formik.handleBlur('email')}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>
          {formik.touched.email && formik.errors.email && (
            <Text className="text-red-500 text-sm mb-2 ml-1">
              {formik.errors.email}
            </Text>
          )}

          {/* Password */}
          <View className="flex-row items-center border border-gray-300 dark:border-gray-700 rounded-xl px-4 py-3 bg-gray-50 dark:bg-gray-800 mb-2">
            <Lock size={20} color={isDark ? '#9ca3af' : '#6b7280'} />
            <TextInput
              className="flex-1 ml-3 text-gray-800 dark:text-white"
              placeholder="Password"
              placeholderTextColor="#9ca3af"
              value={formik.values.password}
              onChangeText={formik.handleChange('password')}
              onBlur={formik.handleBlur('password')}
              secureTextEntry={!showPassword}
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              {showPassword ? (
                <EyeOff size={20} color={isDark ? '#9ca3af' : '#6b7280'} />
              ) : (
                <Eye size={20} color={isDark ? '#9ca3af' : '#6b7280'} />
              )}
            </TouchableOpacity>
          </View>
          {formik.touched.password && formik.errors.password && (
            <Text className="text-red-500 text-sm mb-4 ml-1">
              {formik.errors.password}
            </Text>
          )}

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
          <TouchableOpacity
            onPress={formik.handleSubmit}
            disabled={isLoading}
            className="bg-indigo-600 rounded-xl py-4 items-center mb-4"
          >
            <Text className="text-white text-base font-semibold">
              {isLoading ? 'Signing In...' : 'Sign In'}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}