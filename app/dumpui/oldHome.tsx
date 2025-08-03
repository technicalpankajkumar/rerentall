import SafeAreaWithGradientBg from "@/components/utility/SafeAreaWithGradientBg";
import { router } from "expo-router";
import {
  Filter,
  Heart,
  Search
} from "lucide-react-native";
import React from "react";
import {
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";

export default function HomeScreen() {
  const featuredProperties = [
    {
      id: 1,
      title: "The Urban Nest",
      location: "New York, US",
      price: 290,
      rating: 4.8,
      image:
        "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400&q=80",
    },
    {
      id: 2,
      title: "Luxe Villa",
      location: "Paris, FR",
      price: 320,
      rating: 4.9,
      image:
        "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400&q=80",
    },
  ];

  const recommendations = [
    {
      id: 1,
      title: "Modern Apartment",
      location: "Downtown",
      price: 180,
      image:
        "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=300&q=80",
    },
    {
      id: 2,
      title: "Cozy Studio",
      location: "Midtown",
      price: 150,
      image:
        "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=300&q=80",
    },
  ];

  const facilities = [
    { icon: "🚗", name: "Car Parking" },
    { icon: "🏋️", name: "Gym & Fitness" },
    { icon: "🏊", name: "Swimming Pool" },
    { icon: "🍽️", name: "Restaurant" },
    { icon: "📶", name: "Wi-Fi & Network" },
    { icon: "🐕", name: "Pet Center" },
    { icon: "⚽", name: "Sport Center" },
    { icon: "🧺", name: "Laundry" },
  ];

  const filterTabs = ["All", "Villa", "House", "Apartment", "Hotel"];

  return (
    <SafeAreaWithGradientBg center={true}>
      <ScrollView className="" showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className="px-4 pt-4 pb-2">
          <View className="flex-row items-center justify-between mb-4">
            <View className="flex-row items-center">
              <TouchableOpacity onPress={()=>router.push('/(common)/profiles')}>
              <Image
                source={{
                  uri: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mohammad",
                }}
                alt="Image"
                className="w-10 h-10 rounded-full mr-3"
              />
              </TouchableOpacity>
              <View>
                <Text className="text-gray-500 text-sm">Good Morning 👋</Text>
                <Text className="text-lg font-semibold text-gray-900">
                  Pankaj
                </Text>
              </View>
            </View>
            <TouchableOpacity>
              <View className="w-10 h-10 bg-gray-100 rounded-full items-center justify-center">
                <Text className="text-lg">🔔</Text>
              </View>
            </TouchableOpacity>
          </View>

          {/* Search Bar */}
          <View className="flex-row items-center bg-gray-100 rounded-xl px-4 py-3 mb-4">
            <Search size={20} color="#9CA3AF" />
            <TextInput
              placeholder="Search by locations"
              className="flex-1 ml-3 text-gray-700"
              placeholderTextColor="#9CA3AF"
            />
            <TouchableOpacity>
              <Filter size={20} color="#3B82F6" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Featured Section */}
        <View className="mb-6">
          <View className="flex-row justify-between items-center px-4 mb-4">
            <Text className="text-xl font-bold text-gray-900">Featured</Text>
            <TouchableOpacity onPress={()=>router.push("/(common)/properties/rental-listing")}>
              <Text className="text-blue-500 font-medium">See All</Text>
            </TouchableOpacity>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className="px-4"
          >
            {featuredProperties.map((property) => (
              <TouchableOpacity key={property.id} className="mr-4 w-64" onPress={()=>router.push('/(common)/properties/property-details')}>
                <View className="relative">
                  <Image
                    source={{ uri: property.image }}
                    className="w-full h-40 rounded-2xl"
                  />
                  <View className="absolute top-3 left-3 bg-black/50 px-2 py-1 rounded-lg">
                    <Text className="text-white text-sm font-medium">
                      ⭐ {property.rating}
                    </Text>
                  </View>
                  <TouchableOpacity className="absolute top-3 right-3">
                    <Heart size={24} color="white" />
                  </TouchableOpacity>
                </View>
                <View className="mt-3">
                  <Text className="text-lg font-bold text-gray-900">
                    {property.title}
                  </Text>
                  <Text className="text-gray-500 text-sm">
                    {property.location}
                  </Text>
                  <Text className="text-lg font-bold text-gray-900 mt-1">
                    ${property.price}
                    <Text className="text-sm font-normal text-gray-500">
                      /night
                    </Text>
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Our Recommendation Section */}
        <View className="mb-6">
          <View className="flex-row justify-between items-center px-4 mb-4">
            <Text className="text-xl font-bold text-gray-900">
              Our Recommendation
            </Text>
            <TouchableOpacity>
              <Text className="text-blue-500 font-medium">See All</Text>
            </TouchableOpacity>
          </View>

          {/* Filter Tabs */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className="px-4 mb-4"
          >
            {filterTabs.map((tab, index) => (
              <TouchableOpacity
                key={tab}
                className={`mr-3 px-4 py-2 rounded-full ${
                  index === 0 ? "bg-blue-500" : "bg-gray-100"
                }`}
              >
                <Text
                  className={`font-medium ${
                    index === 0 ? "text-white" : "text-gray-600"
                  }`}
                >
                  {tab}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* Recommendation Cards */}
          <View className="px-4">
            {recommendations.map((item) => (
              <View
                key={item.id}
                className="flex-row bg-white rounded-2xl shadow-sm mb-4 p-3"
              >
                <Image
                  source={{ uri: item.image }}
                  className="w-20 h-20 rounded-xl mr-3"
                />
                <View className="flex-1">
                  <Text className="text-lg font-semibold text-gray-900">
                    {item.title}
                  </Text>
                  <Text className="text-gray-500 text-sm mb-2">
                    {item.location}
                  </Text>
                  <Text className="text-lg font-bold text-gray-900">
                    ${item.price}
                    <Text className="text-sm font-normal text-gray-500">
                      /night
                    </Text>
                  </Text>
                </View>
                <TouchableOpacity className="self-start">
                  <Heart size={20} color="#9CA3AF" />
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </View>

        {/* Facilities Section */}
        <View className="px-4 mb-6">
          <Text className="text-xl font-bold text-gray-900 mb-4">
            Facilities
          </Text>
          <View className="flex-row flex-wrap justify-between">
            {facilities.map((facility, index) => (
              <TouchableOpacity
                key={index}
                className="w-[22%] items-center mb-4 p-3 bg-gray-50 rounded-xl"
              >
                <Text className="text-2xl mb-2">{facility.icon}</Text>
                <Text className="text-xs text-gray-600 text-center font-medium">
                  {facility.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Gallery Section */}
        <View className="px-4 mb-6">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-xl font-bold text-gray-900">Gallery</Text>
            <TouchableOpacity>
              <Text className="text-blue-500 font-medium">See All</Text>
            </TouchableOpacity>
          </View>
          <View className="flex-row">
            <Image
              source={{
                uri: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=300&q=80",
              }}
              className="w-24 h-24 rounded-xl mr-3"
            />
            <Image
              source={{
                uri: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=300&q=80",
              }}
              className="w-24 h-24 rounded-xl mr-3"
            />
            <View className="w-24 h-24 rounded-xl bg-gray-200 items-center justify-center">
              <Text className="text-gray-600 font-bold">10+</Text>
            </View>
          </View>
        </View>
      </ScrollView>
      {/* Bottom Navigation */}
      {/* <View className="flex-row bg-white border-t border-gray-100 py-2">
        {[
          { icon: "🏠", label: "Home", active: true },
          { icon: "🔍", label: "Explore", active: false },
          { icon: "❤️", label: "Favorites", active: false },
          { icon: "💬", label: "Messages", active: false },
          { icon: "👤", label: "Profile", active: false },
        ].map((tab, index) => (
          <TouchableOpacity key={index} className="flex-1 items-center py-2">
            <Text className="text-lg mb-1">{tab.icon}</Text>
            <Text
              className={`text-xs ${
                tab.active ? "text-blue-500 font-medium" : "text-gray-400"
              }`}
            >
              {tab.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View> */}

    </SafeAreaWithGradientBg>
  );
}
