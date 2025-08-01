import React from 'react';
import { SafeAreaView, ScrollView, View } from 'react-native';
import Animated, {
    interpolate,
    useAnimatedStyle,
    useSharedValue,
    withRepeat,
    withTiming,
} from 'react-native-reanimated';

export function PropertySkeleton() {
  const shimmer = useSharedValue(0);

  React.useEffect(() => {
    shimmer.value = withRepeat(
      withTiming(1, { duration: 1500 }),
      -1,
      false
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    const opacity = interpolate(shimmer.value, [0, 0.5, 1], [0.3, 0.7, 0.3]);
    return { opacity };
  });

  const SkeletonBox = ({ className }: { className: string }) => (
    <Animated.View className={`bg-gray-300 rounded-lg ${className}`} style={animatedStyle} />
  );

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className="flex-row justify-between items-start px-5 pt-5 pb-4">
          <View className="flex-1">
            <SkeletonBox className="w-15 h-3.5 mb-2" />
            <SkeletonBox className="w-36 h-4.5" />
          </View>
          <SkeletonBox className="w-6 h-6 rounded-full" />
        </View>

        {/* Search */}
        <View className="flex-row px-5 mb-5 space-x-3">
          <SkeletonBox className="flex-1 h-12 rounded-xl" />
          <SkeletonBox className="w-12 h-12 rounded-xl" />
        </View>

        {/* Categories */}
        <View className="flex-row px-5 mb-6 space-x-4">
          {Array.from({ length: 5 }).map((_, index) => (
            <View key={index} className="items-center min-w-[70px]">
              <SkeletonBox className="w-14 h-14 rounded-full mb-2" />
              <SkeletonBox className="w-12 h-3" />
            </View>
          ))}
        </View>

        {/* Section Header */}
        <View className="flex-row justify-between items-center px-5 mb-4">
          <SkeletonBox className="w-36 h-5" />
          <SkeletonBox className="w-12 h-4" />
        </View>

        {/* Horizontal Property Cards */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerClassName="px-5 space-x-4"
        >
          {Array.from({ length: 2 }).map((_, index) => (
            <View key={index} className="bg-white rounded-2xl w-70 overflow-hidden">
              <SkeletonBox className="w-full h-45" />
              <View className="p-4">
                <SkeletonBox className="w-4/5 h-4 mb-2" />
                <SkeletonBox className="w-3/5 h-3.5 mb-3" />
                <View className="flex-row space-x-4 mb-3">
                  <SkeletonBox className="w-10 h-3" />
                  <SkeletonBox className="w-10 h-3" />
                  <SkeletonBox className="w-10 h-3" />
                </View>
                <SkeletonBox className="w-24 h-4.5" />
              </View>
            </View>
          ))}
        </ScrollView>

        {/* Nearby Section Header */}
        <View className="flex-row justify-between items-center px-5 mt-6 mb-4">
          <SkeletonBox className="w-36 h-5" />
          <SkeletonBox className="w-12 h-4" />
        </View>

        {/* Nearby Properties */}
        {Array.from({ length: 2 }).map((_, index) => (
          <View key={index} className="flex-row bg-white rounded-xl mx-5 mb-4 overflow-hidden">
            <SkeletonBox className="w-30 h-25" />
            <View className="flex-1 justify-between p-3">
              <SkeletonBox className="w-4/5 h-3.5" />
              <SkeletonBox className="w-1/2 h-3" />
              <SkeletonBox className="w-20 h-4" />
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
