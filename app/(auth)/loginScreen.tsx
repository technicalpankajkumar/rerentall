import { useLoginMutation } from '@/api';
import SafeAreaWithGradientBg from '@/components/partials/SafeAreaWithGradientBg';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { useRouter } from 'expo-router';
import { useFormik } from 'formik';
import { Apple, Eye, EyeOff } from 'lucide-react-native';
import React, { useState } from 'react';
import { Image, Text, TouchableOpacity, useColorScheme, useWindowDimensions, View } from 'react-native';
import * as Yup from 'yup';

export default function SignInScreen() {
  const [login, { isLoading, error }] = useLoginMutation();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const { width } = useWindowDimensions();
  const isTabletOrWeb = width > 768;
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const formik = useFormik({
    initialValues: { email: '', password: '' },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email').required('Required'),
      password: Yup.string().min(6, 'Min 6 chars').required('Required'),
    }),
    onSubmit: async values => {
      try {
        await login({ email: values.email, password: values.password }).unwrap();
        router.replace('/(renter)/home');
      } catch (err) {
        console.error('Login failed', err);
      }
    },
  });

  return (
    <SafeAreaWithGradientBg center={true}>
      <View className={cn("w-full max-w-md justify-center", isTabletOrWeb && 'scale-125')}>
        <Text className="text-2xl font-bold text-center mb-4 dark:text-white">Get Started With your Fitness Journey</Text>
        <Text className="text-center text-gray-500 dark:text-gray-400 mb-6">Sign in to your Account</Text>

        <View className="flex-row justify-center mb-4">
          <TouchableOpacity className="bg-blue-500 px-4 py-2 rounded-full mr-2">
            <Text className="text-white">Login</Text>
          </TouchableOpacity>
          <TouchableOpacity className="bg-gray-100 dark:bg-gray-700 px-4 py-2 rounded-full">
            <Text className="text-black dark:text-white">Register</Text>
          </TouchableOpacity>
        </View>

        <View className="mb-4">
          <Input
            placeholder="Email"
            className="border border-gray-300 dark:border-gray-600 rounded-full px-4 text-black dark:text-white"
            onChangeText={formik.handleChange('email')}
            onBlur={formik.handleBlur('email')}
            value={formik.values.email}
            placeholderTextColor={isDark ? '#ccc' : '#888'}
          />
          {formik.touched.email && formik.errors.email && (
            <Text className="text-red-500 text-xs mt-1">{formik.errors.email}</Text>
          )}
        </View>

        <View className="mb-4 relative">
          <Input
            placeholder="Password"
            secureTextEntry={!showPassword}
            className="border border-gray-300 dark:border-gray-600 rounded-full px-4 py-3 pr-10 text-black dark:text-white"
            onChangeText={formik.handleChange('password')}
            onBlur={formik.handleBlur('password')}
            value={formik.values.password}
            placeholderTextColor={isDark ? '#ccc' : '#888'}
          />
          <TouchableOpacity
            onPress={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-4"
          >
            {showPassword ? <EyeOff size={24} /> : <Eye size={24} />}
          </TouchableOpacity>
          {formik.touched.password && formik.errors.password && (
            <Text className="text-red-500 text-xs mt-1">{formik.errors.password}</Text>
          )}
        </View>

        <TouchableOpacity className="mb-4 self-end">
          <Text className="text-blue-600 text-sm">Forgot Password?</Text>
        </TouchableOpacity>

        <Button onPress={formik.handleSubmit} className="bg-blue-500 rounded-full py-3 mb-4">
          <Text className="text-white text-center">Login</Text>
        </Button>

        <Text className="text-center my-4 text-gray-500 dark:text-gray-400">or continue with</Text>

        <View className="flex-row justify-center gap-4">
          <TouchableOpacity className="border border-gray-300 dark:border-gray-600 rounded-full px-4 py-2 flex-row items-center">
            <Image source={require('@/assets/images/icon.png')} className="w-5 h-5 mr-2" />
            <Text className="dark:text-white">Google</Text>
          </TouchableOpacity>
          <TouchableOpacity className="border border-gray-300 dark:border-gray-600 rounded-full px-4 py-2 flex-row items-center">
            <Apple size={20} className="mr-2" />
            <Text className="dark:text-white">Apple</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity className="mt-6">
          <Text className="text-center text-sm text-black dark:text-white">
            Don’t have an account? <Text className="text-blue-500" onPress={() => router.push('/(auth)/registerScreen')}>Sign Up</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaWithGradientBg>
  );
}
