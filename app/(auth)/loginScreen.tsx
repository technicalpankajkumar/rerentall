import { useLoginMutation } from '@/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Text } from '@/components/ui/text';
import DecoratorCircle from '@/components/utility/DecoratorCircle';
import { useColorScheme } from '@/lib/useColorScheme';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import { useFormik } from 'formik';
import { Lock, Mail, MessageCircle } from 'lucide-react-native';
import { useEffect, useState } from 'react';
import {
  Alert,
  Image,
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
  const {isDarkColorScheme} = useColorScheme()

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
      colors={isDarkColorScheme ?['#1f2937', '#111827'] : ['#f8fafc', '#e2e8f0', '#cbd5e1']}
      className="flex-1"
    >
      {/* Decorative Circles */}
      <DecoratorCircle/>
      <ScrollView contentContainerClassName="flex-grow px-6 pt-20 pb-8">
        {/* Header */}
        <View className="items-center mb-4">
          <View className="w-16 h-16 bg-white dark:bg-gray-800 rounded-xl justify-center items-center shadow">
            <MessageCircle size={32} color={isDarkColorScheme ? '#facc15' : '#4F46E5'} />
          </View>
          <Text className="font-bold mt-4 mb-0.5" size='xl'>
            Sign in to Re-Rental Dicovery
          </Text>
          <View className='flex-row gap-1 items-center'>
            <Text className="font-semibold" size='md'>
            First time here?
          </Text>
            <Text className="text-indigo-600 font-semibold" size='md' onPress={()=>router.push('/(auth)/registerScreen')}> Sign Up</Text>
          </View>
        </View>

        {/* Form */}
        <View className="px-2 py-6 gap-2">
          <Input
            size='md'
            label='Email'
            radius='lg'
            prefix={<Mail size={20} color={isDarkColorScheme ? '#9ca3af' : '#6b7280'} />}
            placeholder="email@example.com"
            placeholderTextColor="#9ca3af"
            value={formik.values.email}
            onChangeText={formik.handleChange('email')}
            onBlur={formik.handleBlur('email')}
            keyboardType="email-address"
            autoCapitalize="none"
            error={formik.touched.email && formik.errors.email}
          />
          <Input
            label='Password'
            radius='lg'
            prefix={<Lock size={20} color={isDarkColorScheme ? '#9ca3af' : '#6b7280'} />}
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
          <View className="flex-1 justify-between py-2">
            <TouchableOpacity
              className="flex-row items-center"
              onPress={() => setRememberMe(!rememberMe)}
              activeOpacity={0.7}
            >
              <View
                className={`w-5 h-5  rounded mr-2 items-center justify-center ${rememberMe ? 'bg-primary' : 'border border-slate-500 dark:border-slate-600 bg-transparent'
                  }`}
              >
                {rememberMe && <Text className="text-white" size='md'>✓</Text>}
              </View>
              <Text className="text-gray-600 dark:text-gray-300" size='md'>
                Remember me password
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
            disabled={isLoading} variant="default" size="sm" style={{elevation:1}}>
            {isLoading ? 'Signing In...' : 'Sign In'}
          </Button>

          <View className="w-full items-center mt-6">
            {/* Divider */}
            <View className="flex-row items-center w-full mb-4 px-4">
              <View className="flex-1 h-px bg-gray-300" />
              <Text className="mx-3 text-gray-500" size='md'>or sign in with</Text>
              <View className="flex-1 h-px bg-gray-300" />
            </View>

            {/* Social Buttons */}
            <View className="flex-row space-x-4 gap-4">
              {[
                { icon: <Image source={require('@assets/icons/google.png')} resizeMode="cover" className='h-8 w-8'/>, key: 'google' }, // Replace GanttChart with Google icon 
                { icon: <Image source={require('@assets/icons/facebook.png')} resizeMode="cover" className='h-8 w-8'/>, key: 'facebook' },
              ].map(({ icon, key }) => (
                <TouchableOpacity
                  key={key}
                  className="w-12 h-12 rounded-xl border border-gray-200 bg-white justify-center items-center"
                  onPress={() => console.log(`Sign in with ${key}`)}
                  style={{elevation:1}}
                >
                  {icon}
                </TouchableOpacity>
              ))}
            </View>
          </View>

        </View>
      </ScrollView>
    </LinearGradient>
  );
}