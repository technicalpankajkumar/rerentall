import { ToggleTheme } from '@/components/ThemeToggle';
import { Text } from '@/components/ui/text';
import { CategorySelector } from '@/components/utility/CategorySelector';
import { PropertyCard } from '@/components/utility/PropertyCard';
import { PropertySkeleton } from '@/components/utility/PropertySkeleton';
import { SearchBar } from '@/components/utility/SearchBar';
import { useColorScheme } from '@/lib/useColorScheme';
import * as Location from 'expo-location';
import { router } from 'expo-router';
import { ArrowLeft, Bell } from 'lucide-react-native';
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

export default function PropertyList() {
  const [location, setLocation] = useState('Lucknow, India');
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [properties, setProperties] = useState<Property[]>([]);
  const {isDarkColorScheme}= useColorScheme()

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
        {
          id: '5',
          title: 'Shivans Singh Property',
          price: 850,
          location: 'Connecticut 35624',
          beds: 2,
          baths: 2,
          sqft: 1950,
          image: 'https://images.pexels.com/photos/280222/pexels-photo-280222.jpeg',
          type: 'Apartment',
          isFavorite: false,
        },
         {
          id: '6',
          title: 'Bhola Gupta Property',
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
          id: '7',
          title: 'Mike Neo Property',
          price: 1900,
          location: 'DHA, North Nazimabad, Bahria Town Lahore, Pakistan',
          beds: 3,
          baths: 2,
          sqft: 2567,
          image: 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg',
          type: 'House',
          isFavorite: false,
        }
      ]);
      setIsLoading(false);
    }, 1500);
  };

  const handlePropertyPress = (property: Property) => {
    router.push(`/properties/${property.id}`);
  };

  const renderNearbyProperty = ({ item, index }: { item: Property; index: number }) => (
    <Animated.View entering={FadeInDown.delay(index * 150)} className="mb-3">
      <PropertyCard property={item} onPress={() => handlePropertyPress(item)} horizontal />
    </Animated.View>
  );

  if (isLoading) return <PropertySkeleton />;

  return (
    <View style={{ flex: 1 }}>
        {/* Header */}
        <Animated.View entering={FadeInUp} className="flex-row justify-between items-end px-5 py-2">
            <TouchableOpacity
            className="w-10 h-10 rounded-full bg-white/90 dark:bg-slate-800 justify-center items-center"
            onPress={() => router.back()}
          >
            <ArrowLeft color={isDarkColorScheme ? "#FFFFFF" :"#1F2937"} size={24} strokeWidth={2} />
          </TouchableOpacity>
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
        {/* Nearby Properties */}
        <Animated.View entering={FadeInDown.delay(400)} className="mt-4 flex-1">
          <View className="flex-row justify-between items-center px-6 mb-4">
            <Text className=" font-bold" size='md'>Nearby Property</Text>
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
    </View>
  );
}
