import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import DecoratorCircle from '@/components/utility/DecoratorCircle';
import { useColorScheme } from '@/lib/useColorScheme';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { ArrowRight, ChevronRight, MapPin, MessageCircle, ShieldCheck, SkipForward, Upload } from 'lucide-react-native';
import React, { useRef, useState } from 'react';
import {
  Dimensions,
  Image,
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  View
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
    title: 'Find Rentals That',
    subtitle: 'Match Your Lifestyle',
    description:
      'Discover verified properties with smart filters, map view, and curated listings tailored to your needs.',
    icon: <MapPin size={32} color="#FFFFFF" />,
    mockupImage: require('@assets/images/homeui.jpg'),
    gradient: ['#FFF5F0', '#FFE8D6'],
  },
  {
    id: 2,
    title: 'Chat Directly With',
    subtitle: 'Owners and Brokers',
    description:
      'Skip the middlemen. Message landlords and agents right inside the app and schedule your visit instantly.',
    icon: <MessageCircle size={32} color="#FFFFFF" />,
    mockupImage:require('@assets/images/chatui.png'),
    gradient: ['#F0F8FF', '#E6F3FF'],
  },
  {
    id: 3,
    title: 'Post & Boost',
    subtitle: 'Your Listings Easily',
    description:
      'List your property in minutes. Get more views, chat with renters, and upgrade to premium for higher visibility.',
    icon: <Upload size={32} color="#FFFFFF" />,
    mockupImage:require('@assets/images/detailui.jpg'),
    gradient: ['#FFF0F5', '#FFE4E1'],
  },
  {
    id: 4,
    title: 'Verified Listings &',
    subtitle: 'Trusted Community',
    description:
      'Every profile and property goes through checks to ensure safety, trust, and quality across the platform.',
    icon: <ShieldCheck size={32} color="#FFFFFF" />,
    mockupImage: require('@assets/images/exploreui.jpg'),
    gradient: ['#F3E5F5', '#E1BEE7'],
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
      {/* Page Indicators */}
      <View className='flex-row gap-6 pt-4 justify-center'>
        {onboardingData.map((_, index) => (
        <View
          key={index}
          className={`h-2 rounded-full ${index === currentIndex ? 'w-6 bg-primary' : 'w-2 bg-gray-300'}`}
          style={{elevation:1}}
        />
      ))}
      </View>
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
          <View key={slide.id} className="w-screen items-center justify-center pt-2">
            <Animated.View
              entering={FadeIn.duration(300)}
              exiting={FadeOut.duration(300)}
              layout={LinearTransition.springify()}
              className="items-center justify-center relative pb-12"
            >
              {/* Mockup Phone */}
              <View className="w-[75%] aspect-[7/16] bg-black/90 rounded-3xl p-1.5 shadow-2xl mb-6 " style={{elevation:1}}>
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
              <View className="items-center bg-white dark:bg-slate-800 rounded-tr-full pt-3 px-4 absolute -bottom-2 pb-10" style={{elevation:1}}>
                <View className="w-14 h-14 rounded-full bg-primary dark:bg-primary-foreground justify-center items-center mb-2" style={{elevation:1}}>
                  {slide.icon}
                </View>
                <Text className="font-bold  text-center " size='lg'>{slide.title}</Text>
                <Text className="font-semibold  text-center text-blue-700 mb-2" size='sm'>{slide.subtitle}</Text>
                <Text className="text-center leading-4 opacity-75" size='sm'>{slide.description}</Text>
              </View>
            </Animated.View>
          </View>
        ))}
      </ScrollView>

      {/* Bottom Actions */}
      <View className="flex-row justify-evenly items-center px-6 pb-6 bg-white dark:bg-slate-800">
        {currentIndex < onboardingData.length - 1 && (<Button onPress={handleSkip} size={'sm'} radius='full' className='flex-row gap-2 items-center px-6' style={{elevation:1}}>
            <Text className="font-semibold text-white dark:text-blue-600" size='lg'>Skip</Text>
             <SkipForward size={20}  color={isDarkColorScheme ? '#2563eb' : 'white'}/>
        </Button>)
}
        {currentIndex < onboardingData.length - 1 ? (
          <Button onPress={handleNext} size={'sm'} radius='full' className='flex-row gap-2 items-center ps-6 pe-2' style={{elevation:1}}>
            <Text className="font-semibold text-white dark:text-blue-600" size='lg'>Continue</Text>
             <ChevronRight size={20}  color={isDarkColorScheme ? '#2563eb' : 'white'}/>
        </Button>
        ) : (
          <Button onPress={handleGetStarted} size={'sm'} radius='full' className='flex-row gap-2 items-center ps-6 pe-4' style={{elevation:1}}>
            <Text className="font-semibold text-white dark:text-blue-600" size='lg'>Get Started</Text>
             <ArrowRight size={20}  color={isDarkColorScheme ? '#2563eb' : 'white'}/>
        </Button>
        )}
      </View>
    </LinearGradient>
  );
}
