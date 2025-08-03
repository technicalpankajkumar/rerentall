import { ToggleTheme } from '@/components/ThemeToggle';
import { Text } from '@/components/ui/text';
import { CategorySelector } from '@/components/utility/CategorySelector';
import { PropertyCard } from '@/components/utility/PropertyCard';
import { PropertySkeleton } from '@/components/utility/PropertySkeleton';
import { SearchBar } from '@/components/utility/SearchBar';
import { useColorScheme } from '@/lib/useColorScheme';
import * as Location from 'expo-location';
import { router } from 'expo-router';
import { Bell, ChevronDown, MapPin } from 'lucide-react-native';
import React, { useEffect, useState } from 'react';
import {
  FlatList,
  TouchableOpacity,
  View
} from 'react-native';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';

interface Property {
  id: string;
  title: string;
  price: number;
  location: string;
  beds: number;
  baths: number;
  sqft: number;
  image: string;
  type: string;
  isFavorite: boolean;
}

export default function HomeScreen() {
  const [location, setLocation] = useState('Lahore, Pakistan');
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [properties, setProperties] = useState<Property[]>([]);
  const { isDarkColorScheme} = useColorScheme()

  useEffect(() => {
    getCurrentLocation();
    loadProperties();
  }, []);

  const getCurrentLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') return;

      const location = await Location.getCurrentPositionAsync({});
      const address = await Location.reverseGeocodeAsync({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });

      if (address[0]) {
        setLocation(`${address[0].city}, ${address[0].country}`);
      }
    } catch (error) {
      console.log('Error getting location:', error);
    }
  };

  const loadProperties = () => {
    setTimeout(() => {
      setProperties([
        {
          id: '1',
          title: 'Mark Willson Property',
          price: 1900,
          location: 'DHA, North Nazimabad, Bahria Town Lahore, Pakistan',
          beds: 3,
          baths: 2,
          sqft: 2567,
          image: 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg',
          type: 'House',
          isFavorite: false,
        },
        {
          id: '2',
          title: 'Eleanor Pena Property',
          price: 1200,
          location: '1901 Thornridge Cir. Shiloh 81073',
          beds: 2,
          baths: 1,
          sqft: 1800,
          image: 'https://images.pexels.com/photos/280222/pexels-photo-280222.jpeg',
          type: 'Villa',
          isFavorite: true,
        },
        {
          id: '3',
          title: 'Bessie Cooper Property',
          price: 1000,
          location: '3517 W. Gray Rd. Utica, Pennsylvania 57867',
          beds: 4,
          baths: 3,
          sqft: 3200,
          image: 'https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg',
          type: 'House',
          isFavorite: false,
        },
        {
          id: '4',
          title: 'Darrell Steward Property',
          price: 850,
          location: 'Connecticut 35624',
          beds: 2,
          baths: 2,
          sqft: 1950,
          image: 'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg',
          type: 'Apartment',
          isFavorite: false,
        },
      ]);
      setIsLoading(false);
    }, 1500);
  };

  const handlePropertyPress = (property: Property) => {
    router.push(`/properties/${property.id}`);
  };

  const renderRecommendedProperty = ({ item, index }: { item: Property; index: number }) => (
    <Animated.View entering={FadeInDown.delay(index * 100)} className="mr-4">
      <PropertyCard property={item} onPress={() => handlePropertyPress(item)} />
    </Animated.View>
  );

  const renderNearbyProperty = ({ item, index }: { item: Property; index: number }) => (
    <Animated.View entering={FadeInDown.delay(index * 150)} className="mb-2">
      <PropertyCard property={item} onPress={() => handlePropertyPress(item)} horizontal />
    </Animated.View>
  );

  if (isLoading) return <PropertySkeleton />;

  return (
    <View style={{ flex: 1 }} className='bg-white dark:bg-background'>
      <>
        {/* Header */}
        <Animated.View entering={FadeInUp} className="flex-row justify-between items-end px-5 py-2 mb-2">
          <View className="flex-1">
            <Text className="font-medium mb-1 ms-1" size='md'>Location</Text>
            <TouchableOpacity className="flex-row items-center justify-start">
              <MapPin color="#3B82F6" size={16} />
              <Text className=" font-semibold  mx-1" size='sm'>{location}</Text>
              <ChevronDown color="#9CA3AF" size={16} />
            </TouchableOpacity>
          </View>
          <View className='flex-row gap-2'>
            <TouchableOpacity className="relative p-2">
              <Bell color={isDarkColorScheme? "#ffffff" :"#374151"} size={24} />
              <View className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
            </TouchableOpacity>
            <ToggleTheme/>
          </View>
        </Animated.View>

        {/* Search Bar */}
        <Animated.View entering={FadeInDown.delay(100)} className="">
          <SearchBar value={searchQuery} onChangeText={setSearchQuery} onFilterPress={() => {}} />
        </Animated.View>
        {/* Categories */}
        <Animated.View entering={FadeInDown.delay(200)} className="ps-4 mt-4">
          <CategorySelector selectedCategory={selectedCategory} onCategorySelect={setSelectedCategory} />
        </Animated.View>
        {/* Recommended Properties */}
        <Animated.View entering={FadeInDown.delay(300)} className="mt-4">
          <View className="flex-row justify-between items-center px-5 mb-3">
            <Text className="font-bold " size='md'>Recommended Property</Text>
            <TouchableOpacity onPress={()=>router.push("/(common)/properties/property-list")}>
              <Text className=" font-semibold text-blue-500 dark:text-blue-700" size='md'>See all</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={properties}
            renderItem={renderRecommendedProperty}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 20 }}
          />
        </Animated.View>

        {/* Nearby Properties */}
        <Animated.View entering={FadeInDown.delay(400)} className="mt-4 flex-1">
          <View className="flex-row justify-between items-center px-4 mb-2">
            <Text className=" font-bold" size='md'>Nearby Property</Text>
            <TouchableOpacity onPress={()=>router.push("/(common)/properties/property-list")}>
              <Text className="font-semibold text-blue-500 dark:text-blue-700" size='md'>See all</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={properties}
            renderItem={renderNearbyProperty}
            keyExtractor={(item) => item.id}
            key="mobile"
            contentContainerStyle={{ padding: 16, paddingBottom:0, paddingTop: 0 }}
            showsVerticalScrollIndicator={false}
            style={{ flex: 1 }}
          />
        </Animated.View>
      </>
    </View>
  );
}
