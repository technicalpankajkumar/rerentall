import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { DescriptionSection } from '@/components/utility/Description';
import { ImageCarousel } from '@/components/utility/ImageCarousel';
import { PropertyDetailSkeleton } from '@/components/utility/ProperyDetailSkeleton';
import { useResponsive } from '@/hooks/useResponsive';
import { useColorScheme } from '@/lib/useColorScheme';
import { router, useLocalSearchParams } from 'expo-router';
import {
  ArrowLeft,
  Bath,
  Bed,
  Heart,
  MapPin,
  MessageCircle,
  Phone,
  Share,
  Square,
  Star,
} from 'lucide-react-native';
import React, { useEffect, useState } from 'react';
import {
  Dimensions,
  Image,
  ScrollView,
  TouchableOpacity,
  View
} from 'react-native';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';

const { height } = Dimensions.get('window');

export default function PropertyDetailScreen() {
  const { id } = useLocalSearchParams();
  const {isDarkColorScheme} = useColorScheme();
  const {heightPercent,widthPercent,moderateScale,moderateVerticalScale} = useResponsive()
  const [property, setProperty] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    loadPropertyDetails();
  }, [id]);

  const loadPropertyDetails = () => {
    setTimeout(() => {
      const mockProperty = {
        id,
        title: 'Mark Willson Property',
        price: 1900,
        location: 'DHA, North Nazimabad, Bahria Town Lahore, Pakistan',
        beds: 3,
        baths: 2,
        sqft: 2567,
        images: [
          'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg',
          'https://images.pexels.com/photos/280222/pexels-photo-280222.jpeg',
          'https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg',
          'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg',
          'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg',
          // 'https://images.pexels.com/photos/2121121/pexels-photo-2121121.jpeg',
          // 'https://images.pexels.com/photos/1029599/pexels-photo-1029599.jpeg',
          // 'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg',
          // 'https://images.pexels.com/photos/2476632/pexels-photo-2476632.jpeg',
          // 'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg',
        ],
        description:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        facilities: [
          'Furniture',
          'Parking',
          'Security',
          'Garden',
          'Swimming Pool',
          'Gym',
        ],
        broker: {
          name: 'Pankaj Kumar',
          phone: '+91 8090433558',
          image:
            require('@assets/images/pankajkumar.jpeg'),
          rating: 4.8,
        },
        rating: "4.5",
        type: 'House',
        isFavorite: false,
      };
      setProperty(mockProperty);
      setIsFavorite(mockProperty.isFavorite);
      setIsLoading(false);
    }, 1000);
  };

  const handleFavoritePress = () => setIsFavorite(!isFavorite);
  const handleBookNow = () => console.log('Book property:', property?.id);

  if (isLoading || !property) return <PropertyDetailSkeleton />;

  return (
    <>
      <View className='flex-1'>
        {/* Header */}
        <View className="absolute top-4 left-0 right-0 flex-row justify-between items-center px-5 z-10">
          <TouchableOpacity
            className="w-10 h-10 rounded-full bg-white dark:bg-slate-800 justify-center items-center" style={{elevation:1}}
            onPress={() => router.back()}
          >
            <ArrowLeft color={isDarkColorScheme? "#FFFFFF" :"#1F2937"} size={24} strokeWidth={2} />
          </TouchableOpacity>
          <View className="flex-row space-x-3 gap-4">
            <TouchableOpacity className="w-10 h-10 rounded-full bg-white dark:bg-slate-800 justify-center items-center" style={{elevation:1}}>
              <Share color={isDarkColorScheme? "#FFFFFF" :"#1F2937"} size={24} strokeWidth={2} />
            </TouchableOpacity>
            <TouchableOpacity
              className="w-10 h-10 rounded-full bg-white dark:bg-slate-800 justify-center items-center" 
              style={{elevation:1}}
              onPress={handleFavoritePress}
            >
              <Heart
                color={isFavorite ? isDarkColorScheme ? '#EF4444' : '#FFFFFF' : isDarkColorScheme ? '#FFFFFF' :'#1F2937'}
                fill={isFavorite ? '#EF4444' : 'none'}
                size={24}
                strokeWidth={2}
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Image Carousel */}
        <View className='relative'>
          <Animated.View entering={FadeInUp} style={{ height: height * 0.35 }}>
            <ImageCarousel images={property.images} />
          </Animated.View>
        </View>

        {/* Static Details */}
        <Animated.View
          entering={FadeInDown.delay(200)}
          className="bg-white dark:bg-background rounded-t-3xl mt-[-24px] pt-4 px-6"
        >
          <View className="flex-row justify-between items-center mb-3">
            <Text className="bg-secondary dark:bg-secondary px-4 py-2 rounded-full font-medium" size='sm' style={{elevation:1}}>{property.type}</Text>
            <Text className="font-bold" size='lg'>${property.price}/Month</Text>
          </View>
          <Text className="font-bold mb-1" size='md'>{property.title}</Text>
          <View className="flex-row items-center mb-1">
            <View className="flex-row items-center mr-4">
              <Star size={16} color="#F59E0B" fill="#F59E0B" />
              <Text className="font-semibold ml-1" size='sm'>4.8</Text>
              <Text className=" ml-1" size='sm'>(73 Reviews)</Text>
            </View>
          </View>

          <View className="flex-row items-center mb-3">
            <MapPin size={16} color={isDarkColorScheme ?"#6B7280" : "#3B82F6"} />
            <Text className=" ml-1" size='sm'>
              {property.location}
            </Text>
          </View>
          <View className="flex-row py-4 border-y border-border dark:border-border mb-4">
            <View className="flex-1 flex-row items-center justify-center">
              <Bed color="#6B7280" size={20} strokeWidth={2} />
              <Text className="font-semibold ml-2" size='sm'>{property.beds} Bed</Text>
            </View>
            <View className="flex-1 flex-row items-center justify-center">
              <Bath color="#6B7280" size={20} strokeWidth={2} />
              <Text className="font-semibold ml-2" size='sm'>{property.baths} Bath</Text>
            </View>
            <View className="flex-1 flex-row items-center justify-center">
              <Square color="#6B7280" size={20} strokeWidth={2} />
              <Text className="font-semibold ml-2" size='sm'>{property.sqft} Sqft</Text>
            </View>
          </View>
        </Animated.View>

        {/* Scrollable Section: Description + Facilities + Broker */}
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ flex: 1 }}
          contentContainerStyle={{ paddingHorizontal: moderateScale(20), paddingBottom: moderateVerticalScale(60) }}
          className='bg-white dark:bg-background'
        >
          <DescriptionSection limit={160} text={property?.description ?? ''} />
          <View className="mb-4">
            <Text className="font-bold mb-3" size='md'>Facilities</Text>
            <View className="flex-row flex-wrap gap-3">
              {property?.facilities?.map((facility, index) => (
                <View
                  key={index}
                  className="bg-secondary dark:bg-secondary px-4 py-1 rounded-full"
                  style={{elevation:1}}
                >
                  <Text className=" font-medium" size='sm'>{facility}</Text>
                </View>
              ))}
            </View>
          </View>
          <View className="mb-2">
            <Text className="font-bold  mb-2" size='md'>Listing Broker</Text>
            <View className="flex-row items-center bg-blue-200 dark:bg-slate-800 p-4 rounded-xl" style={{elevation:1}}>
              <Image
                source={property?.broker?.image}
                className=" rounded-full"
                style={{height:heightPercent(5),width:widthPercent(11)}}
              />
              <View className="flex-1 ml-3">
                <Text className=" font-semibold" size='sm'>{property?.broker?.name}</Text>
                <Text className="mt-0.5" size='sm'>{property?.broker?.phone}</Text>
              </View>
              <View className="flex-row space-x-2 gap-2">
                <TouchableOpacity className="w-12 h-12 rounded-full bg-primary dark:bg-primary justify-center items-center">
                  <MessageCircle color={isDarkColorScheme ? "#000000"  :"#FFFFFF"} size={22} strokeWidth={2} />
                </TouchableOpacity>
                <TouchableOpacity className="w-12 h-12 rounded-full bg-primary dark:bg-primary justify-center items-center">
                  <Phone color={isDarkColorScheme ? "#000000"  :"#FFFFFF"} size={22} strokeWidth={2} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
          {/* Location */}
          <View className="mb-4">
            <Text className="font-bold mb-2" size='md'>
              Location
            </Text>

            <View className="bg-secondary dark:bg-secondary rounded-2xl h-52 items-center justify-center" style={{elevation:1}}>
              <Text className="" size='md'>Map View</Text>
              <Text className=" mt-1" size='sm'>
                Interactive map would be here
              </Text>
            </View>
          </View>
        </ScrollView>
      </View>
      {/* Book Now Button */}
      <Animated.View
        entering={FadeInUp.delay(400)}
        className="absolute bottom-0 left-0 right-0 bg-white dark:bg-background px-5 py-2 pb-4 border-t border-border dark:border-border"
      >
        <Button onPress={handleBookNow} className='mb-2 bg-primary dark:bg-primary rounded-full' style={{elevation:1}}>
          <Text className="font-bold " size='md'>Book Now</Text>
        </Button>
      </Animated.View>
    </>
  );
}
