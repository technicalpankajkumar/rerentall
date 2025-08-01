import { Bath, Bed, Heart, Square } from 'lucide-react-native';
import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

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
          className="flex-row bg-white rounded-xl overflow-hidden p-2 border border-slate-100"
          onPress={onPress}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          activeOpacity={1}
          style={{elevation:1}}
        >
          <Image source={{ uri: property.image }} className="w-32 h-full rounded-xl" />
          <View className="flex-1 ps-4 pe-1">
            <View className="flex-row justify-between items-center mb-1">
              <Text className="text-sm text-gray-500 font-medium">{property.type}</Text>
              <TouchableOpacity className="">
                <Heart
                  color={property.isFavorite ? "#EF4444" : "#9CA3AF"}
                  size={16}
                  strokeWidth={2}
                  fill={property.isFavorite ? "#EF4444" : "none"}
                />
              </TouchableOpacity>
            </View>
            <Text className="text-sm font-semibold text-gray-800 mb-0.5" numberOfLines={1}>{property.title}</Text>
            <Text className="text-xs text-gray-400 mb-2" numberOfLines={1}>{property.location}</Text>
            <Text className="text-base font-bold text-gray-800">${property.price}/Month</Text>
          </View>
        </TouchableOpacity>
      </Animated.View>
    );
  }

  return (
    <Animated.View style={[animatedStyle,{elevation:1}]} className="rounded-2xl w-72 border border-slate-100 bg-white mb-1" >
      <TouchableOpacity
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        activeOpacity={1}
         
      >
        <View className="relative h-44 rounded-t-2xl overflow-hidden p-2" >
          <Image source={{ uri: property.image }} className="w-full h-full rounded-xl" />
          <TouchableOpacity className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/30 justify-center items-center">
            <Heart
              color={property.isFavorite ? "#EF4444" : "#FFFFFF"}
              size={18}
              strokeWidth={2}
              fill={property.isFavorite ? "#EF4444" : "none"}
            />
          </TouchableOpacity>
          <View className="absolute bottom-3 left-3 bg-black/70 px-2 py-1 rounded-md">
            <Text className="text-white text-xs font-medium">{property.type}</Text>
          </View>
        </View>
        <View className="px-3 pt-1 pb-2">
          <Text className="text-base font-bold text-gray-800 mb-1" numberOfLines={1}>{property.title}</Text>
          <Text className="text-sm text-gray-500 mb-3" numberOfLines={1}>{property.location}</Text>
          <View className="flex-row space-x-4 mb-3 gap-2">
            <View className="flex-row items-center space-x-1">
              <Bed color="#6B7280" size={14} />
              <Text className="text-xs text-gray-500 font-medium">{property.beds}</Text>
            </View>
            <View className="flex-row items-center space-x-1">
              <Bath color="#6B7280" size={14} />
              <Text className="text-xs text-gray-500 font-medium">{property.baths}</Text>
            </View>
            <View className="flex-row items-center space-x-1">
              <Square color="#6B7280" size={14} />
              <Text className="text-xs text-gray-500 font-medium">{property.sqft}</Text>
            </View>
          </View>
          <Text className="text-lg font-bold text-gray-800 pb-1">${property.price}/Month</Text>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
}
