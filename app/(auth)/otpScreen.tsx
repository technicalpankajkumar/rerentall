import SafeAreaWithGradientBg from '@/components/partials/SafeAreaWithGradientBg';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { useRouter } from 'expo-router';
import React, { useRef } from 'react';
import { Image, NativeSyntheticEvent, Text, TextInput, TextInputKeyPressEventData, TouchableOpacity, useWindowDimensions, View } from 'react-native';
import Animated, { FadeInRight } from 'react-native-reanimated';

const Otp=()=> {
  const { width } = useWindowDimensions();
  const isTabletOrWeb = width > 768;
  const [code, setCode] = React.useState(['', '', '', '']);
  const inputRefs = useRef<TextInput[]>([]);
  const router = useRouter();

   const handleCodeChange = (text: string, index: number) => {
    const newCode = [...code];
    newCode[index] = text;
    setCode(newCode);
    if (text && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (
    e: NativeSyntheticEvent<TextInputKeyPressEventData>,
    index: number
  ) => {
    if (e.nativeEvent.key === 'Backspace' && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  return (
        <Animated.View entering={FadeInRight.duration(500)} className="flex-1">
    <SafeAreaWithGradientBg center={true}>
        <View className={cn("w-full max-w-md justify-center", isTabletOrWeb && 'scale-125')}>
          <Image source={require('@/assets/images/icon.png')} className="w-40 h-40 self-center mb-6" />
          <Text className="text-2xl font-bold text-center mb-2">Enter Code</Text>
          <Text className="text-center text-gray-500 mb-6">A code has been sent to your email</Text>

          <View className="flex-row justify-between gap-5 mb-4">
            {code.map((digit, index) => (
              <Input
                key={index}
                id={`otp-${index}`}
                value={digit}
                ref={(ref) => {
                  if (ref) inputRefs.current[index] = ref;
                }}
                onChangeText={(text) => handleCodeChange(text, index)}
                onKeyPress={(e) => handleKeyPress(e, index)}
                maxLength={1}
                keyboardType="numeric"
                className="w-16 h-12 bg-white border border-gray-300 rounded-xl text-center text-lg"
              />
            ))}
          </View>

          <TouchableOpacity className="mb-6">
            <Text className="text-blue-500 text-center">Request again</Text>
          </TouchableOpacity>

          <Button onPress={() => console.log(code.join(''))} className="bg-blue-500 rounded-full py-3">
            <Text className="text-white text-center" onPress={()=>router.push('/(auth)/loginScreen')}>Confirm</Text>
          </Button>
        </View>
      </SafeAreaWithGradientBg>
    </Animated.View>
  );
}

export default Otp;
