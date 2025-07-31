import SafeAreaWithGradientBg from "@/components/utility/SafeAreaWithGradientBg";
import { router } from "expo-router";
import {
    ArrowLeft,
    Bath,
    Bed,
    Car,
    Heart,
    MapPin,
    Share,
    Square,
    Star,
} from "lucide-react-native";
import React, { useState } from "react";
import {
    Dimensions,
    Image,
    ScrollView,
    Text,
    TouchableOpacity,
    View
} from "react-native";

const { width } = Dimensions.get("window");

export default function PropertyDetailScreen() {
  const [isFavorite, setIsFavorite] = useState(false);

  const propertyImages = [
    "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
    "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80",
    "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&q=80",
  ];

  const amenities = [
    { icon: "bed", label: "4 Bed", value: "4" },
    { icon: "bath", label: "2 Bath", value: "2" },
    { icon: "square", label: "2 Floor", value: "2" },
    { icon: "car", label: "Garage", value: "1" },
  ];

  const renderAmenityIcon = (iconType: string) => {
    const iconProps = { size: 20, color: "#6B7280" };
    switch (iconType) {
      case "bed":
        return <Bed {...iconProps} />;
      case "bath":
        return <Bath {...iconProps} />;
      case "square":
        return <Square {...iconProps} />;
      case "car":
        return <Car {...iconProps} />;
      default:
        return <Square {...iconProps} />;
    }
  };

  return (
    <SafeAreaWithGradientBg>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header Image with Navigation */}
        <View className="relative">
          <Image
            source={{ uri: propertyImages[0] }}
            className="w-full h-80"
            resizeMode="cover"
          />

          {/* Header Navigation */}
          <View className="absolute top-12 left-0 right-0 flex-row justify-between items-center px-4">
            <TouchableOpacity className="w-10 h-10 bg-black/30 rounded-full items-center justify-center" onPress={()=>router.back()}>
              <ArrowLeft size={20} color="white" />
            </TouchableOpacity>

            <View className="flex-row space-x-3">
              <TouchableOpacity className="w-10 h-10 bg-black/30 rounded-full items-center justify-center">
                <Share size={20} color="white" />
              </TouchableOpacity>
              <TouchableOpacity
                className="w-10 h-10 bg-black/30 rounded-full items-center justify-center"
                onPress={() => setIsFavorite(!isFavorite)}
              >
                <Heart
                  size={20}
                  color={isFavorite ? "#EF4444" : "white"}
                  fill={isFavorite ? "#EF4444" : "transparent"}
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* Image Indicators */}
          <View className="absolute bottom-4 left-0 right-0 flex-row justify-center space-x-2">
            {propertyImages.map((_, index) => (
              <View
                key={index}
                className={`w-2 h-2 rounded-full ${
                  index === 0 ? "bg-white" : "bg-white/50"
                }`}
              />
            ))}
          </View>
        </View>

        {/* Property Details */}
        <View className="px-4 py-6">
          {/* Title and Rating */}
          <View className="mb-4">
            <Text className="text-2xl font-bold text-gray-900 mb-2">
              Tropical Luxury Surabaya House
            </Text>

            <View className="flex-row items-center mb-3">
              <View className="flex-row items-center mr-4">
                <Star size={16} color="#F59E0B" fill="#F59E0B" />
                <Text className="text-gray-900 font-semibold ml-1">4.8</Text>
                <Text className="text-gray-500 ml-1">(73 Reviews)</Text>
              </View>
            </View>

            <View className="flex-row items-center">
              <MapPin size={16} color="#6B7280" />
              <Text className="text-gray-600 ml-1">
                Jl. Sultan Iskandar Muda, Jakarta Selatan
              </Text>
            </View>
          </View>

          {/* Description */}
          <View className="mb-6">
            <Text className="text-gray-700 leading-6">
              The 2-storey house has a minimalist design, you can find a
              swimming pool and a garage in this house. They offer a unique
              experience for you and your family.
            </Text>
          </View>

          {/* Detail Properties */}
          <View className="mb-6">
            <Text className="text-lg font-bold text-gray-900 mb-4">
              Detail Properties
            </Text>

            <View className="flex-row justify-between">
              {amenities.map((amenity, index) => (
                <View key={index} className="items-center flex-1">
                  <View className="w-12 h-12 bg-gray-100 rounded-xl items-center justify-center mb-2">
                    {renderAmenityIcon(amenity.icon)}
                  </View>
                  <Text className="text-gray-900 font-semibold">
                    {amenity.value}
                  </Text>
                  <Text className="text-gray-500 text-sm">
                    {amenity.label.split(" ")[1] || amenity.label}
                  </Text>
                </View>
              ))}
            </View>
          </View>

          {/* Location */}
          <View className="mb-6">
            <Text className="text-lg font-bold text-gray-900 mb-4">
              Location
            </Text>

            <View className="bg-gray-100 rounded-2xl h-48 items-center justify-center">
              <Text className="text-gray-500">Map View</Text>
              <Text className="text-gray-400 text-sm mt-1">
                Interactive map would be here
              </Text>
            </View>
          </View>

          {/* Gallery */}
          <View className="mb-6">
            <View className="flex-row justify-between items-center mb-4">
              <Text className="text-lg font-bold text-gray-900">Gallery</Text>
              <TouchableOpacity>
                <Text className="text-blue-500 font-medium">See All</Text>
              </TouchableOpacity>
            </View>

            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {propertyImages.map((image, index) => (
                <TouchableOpacity key={index} className="mr-3">
                  <Image
                    source={{ uri: image }}
                    className="w-24 h-24 rounded-xl"
                  />
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
      {/* Bottom Price and Book Button */}
      <View className="bg-white border-t border-gray-100 px-4 py-4">
        <View className="flex-row items-center justify-between">
          <View>
            <Text className="text-2xl font-bold text-gray-900">
              Rp 2.500.000
              <Text className="text-base font-normal text-gray-500">
                /month
              </Text>
            </Text>
          </View>

          <TouchableOpacity className="bg-blue-500 px-8 py-4 rounded-xl">
            <Text className="text-white font-semibold text-lg">Book Now</Text>
          </TouchableOpacity>
        </View>
      </View>
      </ScrollView>

    </SafeAreaWithGradientBg>
  );
}
