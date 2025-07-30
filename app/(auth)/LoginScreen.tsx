// app/(auth)/login.tsx
import { useLoginMutation } from '@/api';
import { cn } from '@/lib/utils';
import { useRouter } from 'expo-router';
import { useFormik } from 'formik';
import { Apple, Eye, EyeOff } from 'lucide-react-native';
import React, { useState } from 'react';
import { Button, Image, Text, TextInput, TouchableOpacity, useWindowDimensions, View } from 'react-native';
import * as Yup from 'yup';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [login, { isLoading, error }] = useLoginMutation();
  const router = useRouter();
  const [showPassword, setShowPassword] = React.useState(false);
  const { width } = useWindowDimensions();
  const isTabletOrWeb = width > 768;

  const formik = useFormik({
    initialValues: { email: '', password: '' },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email').required('Required'),
      password: Yup.string().min(6, 'Min 6 chars').required('Required'),
    }),
    onSubmit: values => {
      console.log(values);
    },
  });

  const handleLogin = async () => {
    try {
      await login({ email, password }).unwrap();
      router.replace('/'); // Redirect to home after login
    } catch (err) {
      console.error('Login failed', err);
    }
  };

  return (
       <View className="flex-1 justify-center items-center bg-white px-4">
      <View className={cn("w-full max-w-md", isTabletOrWeb && 'scale-125')}>        
        <Text className="text-2xl font-bold text-center mb-4">Get Started With your Fitness Journey</Text>
        <Text className="text-center text-gray-500 mb-6">Sign in to your Account</Text>

        <View className="flex-row justify-center mb-4">
          <TouchableOpacity className="bg-blue-500 px-4 py-2 rounded-full mr-2">
            <Text className="text-white">Login</Text>
          </TouchableOpacity>
          <TouchableOpacity className="bg-gray-100 px-4 py-2 rounded-full">
            <Text className="text-black">Register</Text>
          </TouchableOpacity>
        </View>

        <View className="mb-4">
          <TextInput
            placeholder="Email"
            className="border border-gray-300 rounded-full px-4 py-3"
            onChangeText={formik.handleChange('email')}
            onBlur={formik.handleBlur('email')}
            value={formik.values.email}
          />
          {formik.touched.email && formik.errors.email && (
            <Text className="text-red-500 text-xs mt-1">{formik.errors.email}</Text>
          )}
        </View>

        <View className="mb-4 relative">
          <TextInput
            placeholder="Password"
            secureTextEntry={!showPassword}
            className="border border-gray-300 rounded-full px-4 py-3 pr-10"
            onChangeText={formik.handleChange('password')}
            onBlur={formik.handleBlur('password')}
            value={formik.values.password}
          />
          <TouchableOpacity
            onPress={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-3"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </TouchableOpacity>
          {formik.touched.password && formik.errors.password && (
            <Text className="text-red-500 text-xs mt-1">{formik.errors.password}</Text>
          )}
        </View>

        <TouchableOpacity className="mb-4 self-end">
          <Text className="text-blue-600 text-sm">Forgot Password?</Text>
        </TouchableOpacity>

        <Button onPress={formik.handleSubmit} className="bg-blue-500 rounded-full py-3" title='Login' />
          {/* <Text className="text-white text-center">Login</Text> */}
        {/* </Button> */}

        <Text className="text-center my-4 text-gray-500">or continue with</Text>

        <View className="flex-row justify-center gap-4">
          <TouchableOpacity className="border border-gray-300 rounded-full px-4 py-2 flex-row items-center">
            <Image source={require('@/assets/images/icon.png')} className="w-5 h-5 mr-2" />
            <Text>Google</Text>
          </TouchableOpacity>
          <TouchableOpacity className="border border-gray-300 rounded-full px-4 py-2 flex-row items-center">
            <Apple size={20} className="mr-2" />
            <Text>Apple</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity className="mt-6">
          <Text className="text-center text-sm">Don’t have an account? <Text className="text-blue-500">Sign Up</Text></Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
