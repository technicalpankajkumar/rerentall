import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { useFormik } from 'formik';
import { Apple, Eye, EyeOff } from 'lucide-react-native';
import React from 'react';
import { Image, Text, TouchableOpacity, useWindowDimensions, View } from 'react-native';
import Animated, { FadeInRight } from 'react-native-reanimated';
import * as Yup from 'yup';

export default function RegisterScreen() {
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  const { width } = useWindowDimensions();
  const isTabletOrWeb = width > 768;

  const formik = useFormik({
    initialValues: { fullName: '', email: '', password: '', confirmPassword: '' },
    validationSchema: Yup.object({
      fullName: Yup.string().required('Full Name is required'),
      email: Yup.string().email('Invalid email').required('Required'),
      password: Yup.string().min(6, 'Min 6 chars').required('Required'),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password')], 'Passwords must match')
        .required('Confirm Password is required'),
    }),
    onSubmit: values => {
      console.log(values);
    },
  });

  return (
    <LinearGradient
      colors={["#E0EAFC", "#CFDEF3"]}
      className="flex-1 justify-center items-center px-4"
    >
       <Animated.View 
        entering={FadeInRight.duration(500)} 
        className={cn("w-full max-w-md", isTabletOrWeb && 'scale-125')}
      >
        <Text className="text-2xl font-bold text-center mb-4">Create an account</Text>
        <Text className="text-center text-gray-500 mb-6">Already have an account? <Text className="text-blue-500" onPress={()=>router.push('/(auth)/loginScreen')}>Log in</Text></Text>

        <Input
          placeholder="Full Name"
          className="border border-gray-300 rounded-full px-4 py-3 bg-white mb-4"
          onChangeText={formik.handleChange('fullName')}
          onBlur={formik.handleBlur('fullName')}
          value={formik.values.fullName}
        />
        {formik.touched.fullName && formik.errors.fullName && (
          <Text className="text-red-500 text-xs mb-2">{formik.errors.fullName}</Text>
        )}

        <Input
          placeholder="Email"
          className="border border-gray-300 rounded-full px-4 py-3 bg-white mb-4"
          onChangeText={formik.handleChange('email')}
          onBlur={formik.handleBlur('email')}
          value={formik.values.email}
        />
        {formik.touched.email && formik.errors.email && (
          <Text className="text-red-500 text-xs mb-2">{formik.errors.email}</Text>
        )}

        <View className="mb-4 relative">
          <Input
            placeholder="Password"
            secureTextEntry={!showPassword}
            className="border border-gray-300 rounded-full px-4 py-3 pr-10 bg-white"
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

        <View className="mb-4 relative">
          <Input
            placeholder="Confirm Password"
            secureTextEntry={!showConfirmPassword}
            className="border border-gray-300 rounded-full px-4 py-3 pr-10 bg-white"
            onChangeText={formik.handleChange('confirmPassword')}
            onBlur={formik.handleBlur('confirmPassword')}
            value={formik.values.confirmPassword}
          />
          <TouchableOpacity
            onPress={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-4 top-3"
          >
            {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </TouchableOpacity>
          {formik.touched.confirmPassword && formik.errors.confirmPassword && (
            <Text className="text-red-500 text-xs mt-1">{formik.errors.confirmPassword}</Text>
          )}
        </View>

        <Button onPress={formik.handleSubmit} className="bg-blue-500 rounded-full py-3 mb-4">
          <Text className="text-white text-center">Create account</Text>
        </Button>

        <Text className="text-center my-4 text-gray-500">or continue with</Text>

        <View className="flex-row justify-center gap-4">
          <TouchableOpacity className="border border-gray-300 rounded-full px-4 py-2 flex-row items-center bg-white">
            <Image source={require('@/assets/images/icon.png')} className="w-5 h-5 mr-2" />
            <Text onPress={()=> router.push('/(auth)/otpScreen')}>Google</Text>
          </TouchableOpacity>
          <TouchableOpacity className="border border-gray-300 rounded-full px-4 py-2 flex-row items-center bg-white">
            <Apple size={20} className="mr-2" />
            <Text>Apple</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </LinearGradient>
  );
}
