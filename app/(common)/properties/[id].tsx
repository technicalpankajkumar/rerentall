import { Button } from '@/components/ui/button';
import { DescriptionSection } from '@/components/utility/Description';
import { ImageCarousel } from '@/components/utility/ImageCarousel';
import { PropertyDetailSkeleton } from '@/components/utility/ProperyDetailSkeleton';
import SafeAreaWithGradientBg from '@/components/utility/SafeAreaWithGradientBg';
import { router, useLocalSearchParams } from 'expo-router';
import {
  ArrowLeft,
  Bath,
  Bed,
  Heart,
  MessageCircle,
  Phone,
  Share,
  Square,
} from 'lucide-react-native';
import React, { useEffect, useState } from 'react';
import {
  Dimensions,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';

const { height } = Dimensions.get('window');

export default function PropertyDetailScreen() {
  const { id } = useLocalSearchParams();
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
          'https://images.pexels.com/photos/2121121/pexels-photo-2121121.jpeg',
          'https://images.pexels.com/photos/1029599/pexels-photo-1029599.jpeg',
          'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg',
          'https://images.pexels.com/photos/2476632/pexels-photo-2476632.jpeg',
          'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg',
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
          name: 'Muhammad Farhan',
          phone: '+92 321 1234567',
          image:
            'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg',
          rating: 4.8,
        },
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
    <SafeAreaWithGradientBg>
      <View className='flex-1'>
        {/* Header */}
        <View className="absolute top-4 left-0 right-0 flex-row justify-between items-center px-5 z-10">
          <TouchableOpacity
            className="w-10 h-10 rounded-full bg-white/90 justify-center items-center shadow-md"
            onPress={() => router.back()}
          >
            <ArrowLeft color="#1F2937" size={24} strokeWidth={2} />
          </TouchableOpacity>
          <View className="flex-row space-x-3 gap-4">
            <TouchableOpacity className="w-10 h-10 rounded-full bg-white/90 justify-center items-center shadow-md">
              <Share color="#1F2937" size={24} strokeWidth={2} />
            </TouchableOpacity>
            <TouchableOpacity
              className="w-10 h-10 rounded-full bg-white/90 justify-center items-center shadow-md"
              onPress={handleFavoritePress}
            >
              <Heart
                color={isFavorite ? '#EF4444' : '#1F2937'}
                fill={isFavorite ? '#EF4444' : 'none'}
                size={24}
                strokeWidth={2}
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Image Carousel */}
        <Animated.View entering={FadeInUp} style={{ height: height * 0.35 }}>
          <ImageCarousel images={property.images} />
        </Animated.View>

        {/* Static Details */}
        <Animated.View
          entering={FadeInDown.delay(200)}
          className="bg-white rounded-t-3xl mt-[-24px] pt-6 px-5"
        >
          <View className="flex-row justify-between items-center mb-3">
            <Text className="text-sm text-gray-500 font-medium">{property.type}</Text>
            <Text className="text-xl font-bold text-gray-900">${property.price}/Month</Text>
          </View>
          <Text className="text-xl font-bold text-gray-900 mb-1">{property.title}</Text>
          <Text className="text-base text-gray-500 mb-4">{property.location}</Text>
          <View className="flex-row py-4 border-y border-gray-100 mb-4">
            <View className="flex-1 flex-row items-center justify-center">
              <Bed color="#6B7280" size={20} strokeWidth={2} />
              <Text className="text-base font-semibold text-gray-700 ml-2">{property.beds} Bed</Text>
            </View>
            <View className="flex-1 flex-row items-center justify-center">
              <Bath color="#6B7280" size={20} strokeWidth={2} />
              <Text className="text-base font-semibold text-gray-700 ml-2">{property.baths} Bath</Text>
            </View>
            <View className="flex-1 flex-row items-center justify-center">
              <Square color="#6B7280" size={20} strokeWidth={2} />
              <Text className="text-base font-semibold text-gray-700 ml-2">{property.sqft} Sqft</Text>
            </View>
          </View>
        </Animated.View>

        {/* Scrollable Section: Description + Facilities + Broker */}
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ flex: 1 }}
          contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 120 }}
          className='bg-white'
        >
          <DescriptionSection limit={50} text={property?.description ?? ''} />
          <View className="mb-4">
            <Text className="text-lg font-bold text-gray-900 mb-3">Facilities</Text>
            <View className="flex-row flex-wrap gap-3">
              {property?.facilities?.map((facility, index) => (
                <View
                  key={index}
                  className="bg-gray-100 px-4 py-1 rounded-full shadow-sm"
                >
                  <Text className="text-sm text-gray-700 font-medium">{facility}</Text>
                </View>
              ))}
            </View>
          </View>
          <View className="mb-2">
            <Text className="text-lg font-bold text-gray-900 mb-2">Listing Broker</Text>
            <View className="flex-row items-center bg-blue-100 p-4 rounded-xl">
              <Image
                source={{ uri: property?.broker?.image }}
                className="w-12 h-12 rounded-full"
              />
              <View className="flex-1 ml-3">
                <Text className="text-base font-semibold text-gray-900">{property?.broker?.name}</Text>
                <Text className="text-sm text-gray-500 mt-0.5">{property?.broker?.phone}</Text>
              </View>
              <View className="flex-row space-x-2 gap-2">
                <TouchableOpacity className="w-10 h-10 rounded-full bg-blue-500 justify-center items-center">
                  <MessageCircle color="#FFFFFF" size={20} strokeWidth={2} />
                </TouchableOpacity>
                <TouchableOpacity className="w-10 h-10 rounded-full bg-blue-500 justify-center items-center">
                  <Phone color="#FFFFFF" size={20} strokeWidth={2} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
      {/* Book Now Button */}
      <Animated.View
        entering={FadeInUp.delay(400)}
        className="absolute bottom-0 left-0 right-0 bg-white px-5 py-2 pb-4 border-t border-gray-100"
      >
        <Button onPress={handleBookNow} className='mb-2 bg-blue-700'>
          <Text className="text-white text-lg font-bold">Book Now</Text>
        </Button>
      </Animated.View>
    </SafeAreaWithGradientBg>
  );
}
