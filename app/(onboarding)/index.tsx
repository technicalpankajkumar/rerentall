import DecoratorCircle from '@/components/utility/DecoratorCircle';
import { useColorScheme } from '@/lib/useColorScheme';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { ArrowRight, ChevronRight, Home, Palette, SkipForward, Sparkles } from 'lucide-react-native';
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
    icon: <Sparkles size={32} color="#FFFFFF" />,
    mockupImage: require('@assets/images/homeui.jpg'),
    gradient: ['#FFF5F0', '#FFE8D6'],
  },
  {
    id: 2,
    title: 'Simple Steps to Your',
    subtitle: 'Dream Design',
    description:
      'Achieve your dream design by gathering inspiration, sketching ideas, refining details, selecting materials, and perfecting.',
    icon: <Palette size={32} color="#FFFFFF" />,
    mockupImage:require('@assets/images/detailui.jpg'),
    gradient: ['#F0F8FF', '#E6F3FF'],
  },
  {
    id: 3,
    title: 'Homestyler - Endless',
    subtitle: 'Design Possibilities',
    description:
      'Homestyler is a powerful 3D design platform that provides endless creative possibilities for stunning interior designs.',
    icon: <Home size={32} color="#FFFFFF" />,
    mockupImage:require('@assets/images/exploreui.jpg'),
    gradient: ['#FFF0F5', '#FFE4E1'],
  },
];

export default function OnboardingScreen() {
  const scrollViewRef = useRef<ScrollView>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const {isDarkColorScheme}= useColorScheme()

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
   <LinearGradient
      colors={isDarkColorScheme ?['#1f2937', '#111827'] : ['#f8fafc', '#e2e8f0', '#cbd5e1']}
      className="flex-1"
    >
      <DecoratorCircle/>
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
              className="items-center justify-center relative pb-12"
            >
              {/* Mockup Phone */}
              <View className="w-[75%] aspect-[7/16] bg-black/90 rounded-3xl p-1.5 shadow-2xl mb-6 ">
                <View className="absolute top-2 left-1/2 -ml-14 w-28 h-4 bg-black rounded-full z-10" />
                {/* <LinearGradient
                  colors={slide.gradient}
                  className="flex-1 rounded-[26px] overflow-hidden p-4"
                > */}
                  <Image
                    source={slide.mockupImage}
                    className="w-full h-full rounded-2xl"
                    resizeMode="cover"
                  />
                {/* </LinearGradient> */}
              </View>

              {/* Slide Text */}
              <View className="items-center px-4 bg-white rounded-r-3xl rounded-l-3xl p-2 absolute -bottom-6">
                <View className="w-16 h-16 rounded-full bg-primary justify-center items-center mb-4">
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
      {/* <View className="flex-row justify-center items-center py-4 space-x-2">
        {onboardingData.map((_, index) => (
          <View
            key={index}
            className={`h-2 rounded-full ${index === currentIndex ? 'w-6 bg-orange-500' : 'w-2 bg-gray-300'}`}
          />
        ))}
      </View> */}

      {/* Bottom Actions */}
      <View className="flex-row justify-between items-center px-6 pb-6">
        <TouchableOpacity
            onPress={handleSkip}
            className="flex-row items-center bg-primary gap-2 py-2 px-3 rounded-full space-x-2"
          >
            <Text className="text-white text-base font-semibold">Skip</Text>
            <SkipForward size={20} color="#ffffff" />
          </TouchableOpacity>

        {currentIndex < onboardingData.length - 1 ? (
          <TouchableOpacity
            onPress={handleNext}
            className="flex-row items-center bg-primary py-2 px-3 rounded-full space-x-2"
          >
            <Text className="text-white text-base font-semibold">Continue</Text>
            <ChevronRight size={20} color="#ffffff" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={handleGetStarted}
            className="flex-row items-center bg-primary py-2 px-3 rounded-full space-x-2"
          >
            <Text className="text-white text-base font-semibold">Let's Get Started</Text>
            <ArrowRight size={20} color="#ffffff" />
          </TouchableOpacity>
        )}
      </View>
    </LinearGradient>
  );
}
