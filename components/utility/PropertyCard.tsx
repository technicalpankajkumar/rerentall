import { useResponsive } from '@/hooks/useResponsive';
import { Bath, Bed, Heart, Square } from 'lucide-react-native';
import React from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { Text } from '../ui/text';

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

interface PropertyCardProps {
  property: Property;
  onPress: () => void;
  style?: any;
  horizontal?: boolean;
}

export function PropertyCard({ property, onPress, style, horizontal = false }: PropertyCardProps) {
  const scale = useSharedValue(1);
  const {heightPercent,widthPercent,scale:horizantalScle,moderateVerticalScale} = useResponsive()

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  const handlePressIn = () => {
    scale.value = withSpring(0.95);
  };

  const handlePressOut = () => {
    scale.value = withSpring(1);
  };

  if (horizontal) {
    return (
      <Animated.View style={[animatedStyle, style]}>
        <TouchableOpacity
          className="flex-row bg-card dark:bg-card border border-gray-200 dark:border-border rounded-xl overflow-hidden"
          onPress={onPress}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          activeOpacity={1}
          style={{elevation:1,padding:horizantalScle(4)}}
        >
          <Image source={{ uri: property.image }} className="rounded-xl" style={{width:widthPercent(25),height:heightPercent(10)}}/>
          <View className="flex-1 ps-4 pe-1">
            <View className="flex-row justify-between items-center mb-1">
                <Text className="font-semibold  mb-0.5 bg-secondary dark:bg-secondary px-2 rounded-md"  size={'sm'}>{property.type}</Text>
              <TouchableOpacity className="">
                <Heart
                  color={property.isFavorite ? "#EF4444" : "#9CA3AF"}
                  size={16}
                  strokeWidth={2}
                  fill={property.isFavorite ? "#EF4444" : "none"}
                />
              </TouchableOpacity>
            </View>
            <Text className="font-semibold  mb-0.5" numberOfLines={1} size={'sm'}>{property.title}</Text>
            <Text className=" text-gray-500 dark:text-text mb-1.5" numberOfLines={1} size={'sm'} >{property.location}</Text>
            <Text className="font-bold "size={'sm'}>${property.price}/Month</Text>
          </View>
        </TouchableOpacity>
      </Animated.View>
    );
  }

  return (
    <Animated.View style={[animatedStyle,{elevation:1,width:widthPercent(50)}]} className="rounded-2xl bg-card dark:bg-card border border-gray-200 dark:border-border mb-1">
      <TouchableOpacity
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        activeOpacity={1}
         
      >
        <View className="relative rounded-t-2xl overflow-hidden p-2" style={{height:heightPercent(15)}}>
          <Image source={{ uri: property.image }} className="w-full h-full rounded-xl" />
          <TouchableOpacity className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/30 dark:bg-black/50 justify-center items-center">
            <Heart
              color={property.isFavorite ? "#EF4444" : "#FFFFFF"}
              size={18}
              strokeWidth={2}
              fill={property.isFavorite ? "#EF4444" : "none"}
            />
          </TouchableOpacity>
          <View className="absolute bottom-3 left-3 bg-black/70 dark:bg-black/50 px-2 py-1 rounded-lg">
            <Text className="text-white font-medium"size={'sm'}>{property.type}</Text>
          </View>
        </View>
        <View className="px-3 pt-1 pb-2">
          <Text className=" font-bold  mb-1" numberOfLines={1} size='md'>{property.title}</Text>
          <Text className=" text-gray-500 dark:text-gray-700 mb-3" numberOfLines={1} size={'sm'}>{property.location}</Text>
          <View className="flex-row space-x-4 mb-3 gap-2">
            <View className="flex-row items-center space-x-1 gap-2">
              <Bed color="#6B7280" size={14} />
              <Text className="text-gray-500 dark:text-gray-700 font-medium" size={'xs'}>{property.beds}</Text>
            </View>
            <View className="flex-row items-center space-x-1">
              <Bath color="#6B7280" size={14} />
              <Text className="text-gray-500 dark:text-gray-700 font-medium" size={'sm'}>{property.baths}</Text>
            </View>
            <View className="flex-row items-center space-x-1">
              <Square color="#6B7280" size={14} />
              <Text className="text-gray-500 dark:text-gray-700 font-medium" size={'sm'}>{property.sqft}</Text>
            </View>
          </View>
          <Text className="font-bold  pb-1" size='md'>${property.price}/Month</Text>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
}
