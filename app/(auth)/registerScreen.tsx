
import { supabase } from '@/services/supabase';
import { LinearGradient } from 'expo-linear-gradient';
import { useFormik } from 'formik';
import {
  Check,
  Eye,
  EyeOff,
  Lock,
  Mail,
  MessageCircle,
  User,
} from 'lucide-react-native';
import React, { useState } from 'react';
import {
  Alert,
  Dimensions,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';
import * as Yup from 'yup';

const { height } = Dimensions.get('window');

export default function SignUpScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);

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
      colors={isDark ? ['#1f2937', '#111827'] : ['#f8fafc', '#e2e8f0', '#cbd5e1']}
      className="flex-1"
    >
      <ScrollView
        contentContainerStyle={{ paddingTop: height * 0.06 }}
        showsVerticalScrollIndicator={false}
        className="px-6 pb-8"
      >
        <View className="items-center mb-8">
          <View className="w-16 h-16 bg-white rounded-2xl justify-center items-center mb-6 shadow-md">
            <MessageCircle size={32} color="#4F46E5" />
          </View>
          <Text className="text-2xl font-bold text-gray-800 dark:text-gray-100 text-center">Create Your Account</Text>
          <Text className="text-base text-gray-500 dark:text-gray-400 text-center">
            Already have an account?
            <Text className="text-indigo-600 font-semibold"> Sign In</Text>
          </Text>
        </View>

        <View className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-lg">
          {/* Full Name */}
          <View className="flex-row gap-3 mb-2">
            <View className="flex-1 flex-row items-center border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 bg-gray-50 dark:bg-gray-800">
              <User size={20} color={isDark ? '#d1d5db' : '#6b7280'} className="mr-3" />
              <TextInput
                className="flex-1 text-base text-gray-800 dark:text-white"
                placeholder="Full Name"
                placeholderTextColor="#9ca3af"
                value={formik.values.fullName}
                onChangeText={formik.handleChange('fullName')}
                onBlur={formik.handleBlur('fullName')}
              />
            </View>
          </View>
          {formik.touched.fullName && formik.errors.fullName && (
            <Text className="text-red-500 text-sm mb-2 ml-1">{formik.errors.fullName}</Text>
          )}

          {/* Email */}
          <View className="flex-row items-center border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 bg-gray-50 dark:bg-gray-800 mb-2">
            <Mail size={20} color={isDark ? '#d1d5db' : '#6b7280'} className="mr-3" />
            <TextInput
              className="flex-1 text-base text-gray-800 dark:text-white"
              placeholder="Email Address"
              placeholderTextColor="#9ca3af"
              value={formik.values.email}
              onChangeText={formik.handleChange('email')}
              onBlur={formik.handleBlur('email')}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>
          {formik.touched.email && formik.errors.email && (
            <Text className="text-red-500 text-sm mb-2 ml-1">{formik.errors.email}</Text>
          )}

          {/* Password */}
          <View className="relative mb-2">
            <View className="flex-row items-center border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 bg-gray-50 dark:bg-gray-800">
              <Lock size={20} color={isDark ? '#d1d5db' : '#6b7280'} className="mr-3" />
              <TextInput
                className="flex-1 text-base text-gray-800 dark:text-white"
                placeholder="Password"
                placeholderTextColor="#9ca3af"
                secureTextEntry={!showPassword}
                value={formik.values.password}
                onChangeText={formik.handleChange('password')}
                onBlur={formik.handleBlur('password')}
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                {showPassword ? <EyeOff size={20} color={isDark ? '#d1d5db' : '#6b7280'} /> : <Eye size={20} color={isDark ? '#d1d5db' : '#6b7280'} />}
              </TouchableOpacity>
            </View>
            {formik.values.password && (
              <View className="mt-2">
                <View className="h-1 bg-gray-200 dark:bg-gray-700 rounded overflow-hidden mb-1">
                  <View className={`h-1 ${passwordStrength.color}`} style={{ width: `${(passwordStrength.strength / 5) * 100}%` }} />
                </View>
                <Text className={`text-xs font-medium ${passwordStrength.color}`}>{passwordStrength.text}</Text>
              </View>
            )}
            {formik.touched.password && formik.errors.password && (
              <Text className="text-red-500 text-sm mt-1">{formik.errors.password}</Text>
            )}
          </View>

          {/* Confirm Password */}
          <View className="relative mb-2">
            <View className="flex-row items-center border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 bg-gray-50 dark:bg-gray-800">
              <Lock size={20} color={isDark ? '#d1d5db' : '#6b7280'} className="mr-3" />
              <TextInput
                className="flex-1 text-base text-gray-800 dark:text-white"
                placeholder="Confirm Password"
                placeholderTextColor="#9ca3af"
                secureTextEntry={!showConfirmPassword}
                value={formik.values.confirmPassword}
                onChangeText={formik.handleChange('confirmPassword')}
                onBlur={formik.handleBlur('confirmPassword')}
              />
              <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                {showConfirmPassword ? <EyeOff size={20} color={isDark ? '#d1d5db' : '#6b7280'} /> : <Eye size={20} color={isDark ? '#d1d5db' : '#6b7280'} />}
              </TouchableOpacity>
            </View>
            {formik.touched.confirmPassword && formik.errors.confirmPassword && (
              <Text className="text-red-500 text-sm mt-1">{formik.errors.confirmPassword}</Text>
            )}
          </View>

          {/* Terms */}
          <TouchableOpacity className="flex-row items-start py-4 mb-6" onPress={() => setAgreeToTerms(!agreeToTerms)}>
            <View className={`w-5 h-5 border-2 rounded justify-center items-center mt-1 mr-3 ${agreeToTerms ? 'bg-indigo-600 border-indigo-600' : 'border-gray-300 dark:border-gray-600'}`}>
              {agreeToTerms && <Check size={14} color="#fff" />}
            </View>
            <Text className="text-sm text-gray-500 dark:text-gray-400">
              I agree to the <Text className="text-indigo-600 font-medium">Terms of Service</Text> and{' '}
              <Text className="text-indigo-600 font-medium">Privacy Policy</Text>
            </Text>
          </TouchableOpacity>

          {/* Submit */}
          <TouchableOpacity  className="bg-indigo-600 rounded-xl py-4 items-center mb-6" onPress={formik.handleSubmit}>
            <Text className="text-white text-base font-semibold">Create Account</Text>
          </TouchableOpacity>

          {/* Divider */}
          <View className="flex-row items-center mb-6">
            <View className="flex-1 h-px bg-gray-200 dark:bg-gray-700" />
            <Text className="mx-4 text-gray-500 dark:text-gray-400 text-sm">or continue with</Text>
            <View className="flex-1 h-px bg-gray-200 dark:bg-gray-700" />
          </View>

          {/* Social Buttons */}
          <View className="flex-row gap-3">
            <TouchableOpacity className="flex-1 bg-red-600 rounded-xl py-3 flex-row justify-center items-center gap-2">
              <Text className="text-white font-bold text-lg">G</Text>
              <Text className="text-white font-medium text-sm">Google</Text>
            </TouchableOpacity>
            <TouchableOpacity className="flex-1 bg-blue-700 rounded-xl py-3 flex-row justify-center items-center gap-2">
              <Text className="text-white font-bold text-lg">f</Text>
              <Text className="text-white font-medium text-sm">Facebook</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}
