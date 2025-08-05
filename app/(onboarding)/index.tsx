import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { ArrowRight, ChevronRight, Home, Palette, Sparkles } from 'lucide-react-native';
import React, { useRef, useState } from 'react';
import {
  Dimensions,
  Image,
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Animated, {
  FadeIn,
  FadeOut,
  LinearTransition,
} from 'react-native-reanimated';

const { width } = Dimensions.get('window');

const onboardingData = [
  {
    id: 1,
    title: 'Transform Your Space',
    subtitle: 'With AI Magic',
    description:
      'AI can effortlessly redesign your space, enhancing aesthetics and functionality with smart, personalized recommendations.',
    icon: <Sparkles size={32} color="#FF6B35" />,
    mockupImage:
      'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=400',
    gradient: ['#FFF5F0', '#FFE8D6'],
  },
  {
    id: 2,
    title: 'Simple Steps to Your',
    subtitle: 'Dream Design',
    description:
      'Achieve your dream design by gathering inspiration, sketching ideas, refining details, selecting materials, and perfecting.',
    icon: <Palette size={32} color="#FF6B35" />,
    mockupImage:
      'https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg?auto=compress&cs=tinysrgb&w=400',
    gradient: ['#F0F8FF', '#E6F3FF'],
  },
  {
    id: 3,
    title: 'Homestyler - Endless',
    subtitle: 'Design Possibilities',
    description:
      'Homestyler is a powerful 3D design platform that provides endless creative possibilities for stunning interior designs.',
    icon: <Home size={32} color="#FF6B35" />,
    mockupImage:
      'https://images.pexels.com/photos/1571453/pexels-photo-1571453.jpeg?auto=compress&cs=tinysrgb&w=400',
    gradient: ['#FFF0F5', '#FFE4E1'],
  },
];

export default function OnboardingScreen() {
  const scrollViewRef = useRef<ScrollView>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    if (currentIndex < onboardingData.length - 1) {
      const nextIndex = currentIndex + 1;
      scrollViewRef.current?.scrollTo({ x: nextIndex * width, animated: true });
      setCurrentIndex(nextIndex);
    }
  };

  const handleSkip = () => {
    setCurrentIndex(onboardingData?.length - 1)
  };

  const handleGetStarted = async() => {
      await AsyncStorage.setItem('hasSeenOnboarding', 'true');
      router.replace('/(auth)/loginScreen');
  };

  const onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const slideSize = event.nativeEvent.layoutMeasurement.width;
    const index = Math.round(event.nativeEvent.contentOffset.x / slideSize);
    setCurrentIndex(index);
  };

  return (
    <View className="flex-1 bg-white">
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={onScroll}
        scrollEventThrottle={16}
        className="flex-1"
      >
        {onboardingData.map((slide, index) => (
          <View key={slide.id} className="w-screen items-center justify-center px-6 pt-10">
            <Animated.View
              entering={FadeIn.duration(300)}
              exiting={FadeOut.duration(300)}
              layout={LinearTransition.springify()}
              className="items-center justify-center"
            >
              {/* Mockup Phone */}
              <View className="w-[85%] aspect-[9/16] bg-black rounded-3xl p-1 shadow-2xl mb-6">
                <View className="absolute top-2 left-1/2 -ml-14 w-28 h-5 bg-black rounded-full z-10" />
                <LinearGradient
                  colors={slide.gradient}
                  className="flex-1 rounded-[26px] overflow-hidden p-4"
                >
                  <Image
                    source={{ uri: slide.mockupImage }}
                    className="w-full h-full rounded-2xl"
                    resizeMode="cover"
                  />
                </LinearGradient>
              </View>

              {/* Slide Text */}
              <View className="items-center px-4">
                <View className="w-16 h-16 rounded-full bg-orange-100 justify-center items-center mb-6">
                  {slide.icon}
                </View>
                <Text className="text-2xl font-bold text-gray-800 text-center mb-1">{slide.title}</Text>
                <Text className="text-2xl font-bold text-gray-800 text-center mb-4">{slide.subtitle}</Text>
                <Text className="text-base text-center text-gray-600 leading-6">{slide.description}</Text>
              </View>
            </Animated.View>
          </View>
        ))}
      </ScrollView>

      {/* Page Indicators */}
      <View className="flex-row justify-center items-center py-4 space-x-2">
        {onboardingData.map((_, index) => (
          <View
            key={index}
            className={`h-2 rounded-full ${index === currentIndex ? 'w-6 bg-orange-500' : 'w-2 bg-gray-300'}`}
          />
        ))}
      </View>

      {/* Bottom Actions */}
      <View className="flex-row justify-between items-center px-6 pb-10">
        <TouchableOpacity onPress={handleSkip}>
          <Text className="text-gray-500 text-base font-medium">Skip</Text>
        </TouchableOpacity>

        {currentIndex < onboardingData.length - 1 ? (
          <TouchableOpacity
            onPress={handleNext}
            className="flex-row items-center bg-orange-500 py-3 px-6 rounded-full space-x-2"
          >
            <Text className="text-white text-base font-semibold">Continue</Text>
            <ChevronRight size={20} color="#ffffff" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={handleGetStarted}
            className="flex-row items-center bg-orange-500 py-3 px-6 rounded-full space-x-2"
          >
            <Text className="text-white text-base font-semibold">Let's Get Started</Text>
            <ArrowRight size={20} color="#ffffff" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}
