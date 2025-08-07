
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Text } from '@/components/ui/text';
import DecoratorCircle from '@/components/utility/DecoratorCircle';
import { useColorScheme } from '@/lib/useColorScheme';
import { supabase } from '@/services/supabase';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { useFormik } from 'formik';
import {
  Lock,
  Mail,
  MessageCircle,
  User
} from 'lucide-react-native';
import React, { useState } from 'react';
import {
  Alert,
  Dimensions,
  Image,
  ScrollView,
  TouchableOpacity,
  View
} from 'react-native';
import * as Yup from 'yup';

const { height } = Dimensions.get('window');

export default function SignUpScreen() {
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const {isDarkColorScheme} = useColorScheme()

  const formik = useFormik({
    initialValues: {
      fullName: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: Yup.object({
      fullName: Yup.string().required('Full Name is required'),
      email: Yup.string().email('Invalid email').required('Required'),
      password: Yup.string()
        .min(8, 'Min 8 chars')
        .matches(/[A-Z]/, '1 uppercase required')
        .matches(/[a-z]/, '1 lowercase required')
        .matches(/\d/, '1 number required')
        .required('Required'),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password')], 'Passwords must match')
        .required('Confirm Password is required'),
    }),
    onSubmit: async (values) => {
      if (!agreeToTerms) {
        Alert.alert('Terms Required', 'Please agree to the terms and conditions');
        return;
      }
      const { error } = await supabase.auth.signUp({
        email: values.email,
        password: values.password,
        options: {
          data: {
            fullName: values.fullName,
          },
        },
      });

      if (error) {
        Alert.alert('Error', error.message);
      } else {
        Alert.alert('Success', 'Check your email to confirm your account');
      }
    },
  });

  const passwordStrength = (() => {
    const password = formik.values.password;
    if (!password) return { strength: 0, text: '', color: 'bg-gray-200 text-gray-500' };
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) strength++;
    const levels = [
      ['Very Weak', 'bg-red-500 text-red-500'],
      ['Weak', 'bg-orange-500 text-orange-500'],
      ['Fair', 'bg-yellow-500 text-yellow-500'],
      ['Good', 'bg-green-500 text-green-500'],
      ['Strong', 'bg-emerald-600 text-emerald-600'],
    ];
    return {
      strength,
      text: levels[strength - 1]?.[0],
      color: levels[strength - 1]?.[1],
    };
  })();

  return (
    <LinearGradient
      colors={isDarkColorScheme ? ['#1f2937', '#111827'] : ['#f8fafc', '#e2e8f0', '#cbd5e1']}
      className="flex-1"
    >
      {/* Decorative Circles */}
      <DecoratorCircle/>
      <ScrollView
        contentContainerStyle={{ paddingTop: height * 0.06 }}
        showsVerticalScrollIndicator={false}
        className="px-6 pb-8"
      >
        <View className="items-center mb-8">
           <View className="w-16 h-16 bg-white dark:bg-gray-800 rounded-xl justify-center items-center shadow">
            <MessageCircle size={32} color={isDarkColorScheme ? '#facc15' : '#4F46E5'} />
          </View>
          <Text className="font-bold mt-4 mb-0.5" size='xl'>
            Create Your Account
          </Text>
          <View className='flex-row gap-1 items-center'>
            <Text className="font-semibold" size='md'>
            Already have an account?
          </Text>
            <Text className="text-indigo-600 font-semibold" size='md' onPress={()=>router.push('/(auth)/loginScreen')}> Sign In</Text>
          </View>
        </View>
        <View className="flex-1 mb-2">
          {/* Full Name */}
              <Input
                size='md'
                label='Full Name'
                radius='lg'
                prefix={<User size={20} color={isDarkColorScheme ? '#9ca3af' : '#6b7280'} />}
                placeholder="Enter your name"
                placeholderTextColor="#9ca3af"
                value={formik.values.fullName}
                onChangeText={formik.handleChange('fullName')}
                onBlur={formik.handleBlur('fullName')}
                autoCapitalize="none"
                error={formik.touched.fullName && formik.errors.fullName}
              />

          {/* Email */}
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
          {/* Password */}
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

          {/* Confirm Password */}
          <Input
            label='Confirm Password'
            radius='lg'
            prefix={<Lock size={20} color={isDarkColorScheme ? '#9ca3af' : '#6b7280'} />}
            placeholder="Confirm Password"
            placeholderTextColor="#9ca3af"
            value={formik.values.confirmPassword}
            onChangeText={formik.handleChange('confirmPassword')}
            onBlur={formik.handleBlur('confirmPassword')}
            error={formik.touched.confirmPassword && formik.errors.confirmPassword}
            secureToggle
            secureTextEntry
          />

          {/* Terms */}
          <View className="flex-1 justify-between py-4">
            <TouchableOpacity
              className="flex-row items-center"
              onPress={() => setAgreeToTerms(!agreeToTerms)}
              activeOpacity={0.7}
            >
              <View
                className={`w-5 h-5 rounded mr-2 items-center justify-center ${agreeToTerms ? 'bg-primary' : 'border border-slate-500 dark:border-slate-600 bg-transparent'
                  }`}
              >
                {agreeToTerms && <Text className="text-white" size='md'>✓</Text>}
              </View>
             <Text className=" text-gray-500 dark:text-gray-400" size='md'>
              I agree to the <Text className="text-primary font-medium" size='sm'>Terms of Service</Text> and{' '}
              <Text className="text-primary font-medium" size='sm'>Privacy Policy</Text>
            </Text>
            </TouchableOpacity>
          </View>

          {/* Submit */}
          <Button onPress={()=>router.push('/(renter)/home')}
            disabled={isLoading} variant="default" size="sm" style={{elevation:1}}>
            {isLoading ? 'Signup In...' : 'Sign Up'}
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
                { icon: <Image source={require('@assets/icons/google.png')} resizeMode="cover" className='h-8 w-8' />, key: 'google' }, // Replace GanttChart with Google icon 
                { icon: <Image source={require('@assets/icons/facebook.png')} resizeMode="cover" className='h-8 w-8' />, key: 'facebook' },
              ].map(({ icon, key }) => (
                <TouchableOpacity
                  key={key}
                  className="w-12 h-12 rounded-xl border border-gray-200 bg-white justify-center items-center"
                  onPress={() => console.log(`Sign in with ${key}`)}
                  style={{ elevation: 1 }}
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
