import { LinearGradient } from 'expo-linear-gradient';
import { MessageCircle } from 'lucide-react-native';
import React, { useEffect, useState } from 'react';
import { Animated, Text, View } from 'react-native';

export default function SplashScreen() {
  const [fadeAnim] = useState(new Animated.Value(0));
  const [scaleAnim] = useState(new Animated.Value(0.8));

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 50,
        friction: 7,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <LinearGradient
      colors={['#4F46E5', '#3B82F6', '#2563EB']}
      className="flex-1 justify-center items-center"
    >
      {/* Decorative Circles */}
      <View className="absolute w-full h-full">
        <View className="absolute bg-white/10 rounded-full w-5 h-5 top-[15%] left-[20%]" />
        <View className="absolute bg-white/10 rounded-full w-2 h-2 top-[25%] right-[15%]" />
        <View className="absolute bg-white/10 rounded-full w-3 h-3 top-[60%] left-[10%]" />
        <View className="absolute bg-white/10 rounded-full w-4 h-4 bottom-[20%] right-[25%]" />
        <View className="absolute bg-white/10 rounded-full w-1.5 h-1.5 bottom-[35%] left-[25%]" />
      </View>

      {/* Animated View using inline animation style */}
      <Animated.View
        style={{
          opacity: fadeAnim,
          transform: [{ scale: scaleAnim }],
          alignItems: 'center',
        }}
      >
        <View className="w-20 h-20 rounded-2xl bg-white/20 justify-center items-center mb-6">
          <MessageCircle size={48} color="#ffffff" strokeWidth={2} />
        </View>

        <Text className="text-white text-3xl font-bold mb-2 dark:text-white">
          Chat
        </Text>
        <Text className="text-white/80 text-base font-medium dark:text-white/80">
          Freedcamp
        </Text>
      </Animated.View>
    </LinearGradient>
  );
}
