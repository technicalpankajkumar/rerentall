import React from 'react';
import { Dimensions, SafeAreaView, ScrollView, View } from 'react-native';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

const { width, height } = Dimensions.get('window');

export function PropertyDetailSkeleton() {
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

  const SkeletonBox = ({ style }: { style: any }) => (
    <Animated.View style={[{ backgroundColor: '#E5E7EB', borderRadius: 8 }, style, animatedStyle]} />
  );

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="absolute top-[60px] left-0 right-0 z-10 px-5 flex-row justify-between items-center">
          <SkeletonBox style={{ width: 40, height: 40, borderRadius: 20 }} />
          <View className="flex-row space-x-3 gap-2">
            <SkeletonBox style={{ width: 40, height: 40, borderRadius: 20 }} />
            <SkeletonBox style={{ width: 40, height: 40, borderRadius: 20 }} />
          </View>
        </View>

        <SkeletonBox style={{ height: height * 0.45, width: '100%' }} />

        <View className="absolute flex-row justify-center space-x-1.5" style={{ bottom: height * 0.45 - 40 }}>
          {Array.from({ length: 5 }).map((_, index) => (
            <SkeletonBox key={index} style={{ width: 36, height: 4, borderRadius: 2 }} />
          ))}
        </View>

        <View className="bg-white -mt-6 pt-6 px-5 pb-24 rounded-t-3xl">
          <View className="flex-row justify-between items-center mb-3">
            <SkeletonBox style={{ width: 50, height: 14 }} />
            <SkeletonBox style={{ width: 120, height: 16 }} />
          </View>

          <SkeletonBox style={{ width: '80%', height: 16, marginBottom: 8 }} />
          <SkeletonBox style={{ width: '70%', height: 14, marginBottom: 20 }} />

          <View className="flex-row justify-around py-3 border-y border-gray-100 mb-4">
            <SkeletonBox style={{ width: 60, height: 16 }} />
            <SkeletonBox style={{ width: 60, height: 16 }} />
            <SkeletonBox style={{ width: 60, height: 16 }} />
          </View>

          <View className="mb-4">
            <SkeletonBox style={{ width: 120, height: 14, marginBottom: 12 }} />
            <SkeletonBox style={{ width: '100%', height: 10, marginBottom: 8 }} />
            <SkeletonBox style={{ width: '90%', height: 10, marginBottom: 8 }} />
            <SkeletonBox style={{ width: '70%', height: 10 }} />
          </View>

          <View className="mb-4">
            <SkeletonBox style={{ width: 120, height: 14, marginBottom: 12 }} />
            <View className="flex-row flex-wrap gap-3">
              {Array.from({ length: 6 }).map((_, index) => (
                <SkeletonBox key={index} style={{ width: 80, height: 24, borderRadius: 16 }} />
              ))}
            </View>
          </View>

          <View className="mb-4">
            <SkeletonBox style={{ width: 120, height: 18, marginBottom: 12 }} />
            <View className="flex-row items-center bg-gray-50 p-4 rounded-xl">
              <SkeletonBox style={{ width: 48, height: 48, borderRadius: 24 }} />
              <View className="flex-1 ml-3">
                <SkeletonBox style={{ width: 120, height: 16, marginBottom: 4 }} />
                <SkeletonBox style={{ width: 100, height: 14 }} />
              </View>
              <View className="flex-row space-x-2 gap-2">
                <SkeletonBox style={{ width: 40, height: 40, borderRadius: 20 }} />
                <SkeletonBox style={{ width: 40, height: 40, borderRadius: 20 }} />
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      <View className="absolute bottom-0 left-0 right-0 bg-white px-5 py-4 border-t border-gray-100">
        <SkeletonBox style={{ height: 48, borderRadius: 12 }} />
      </View>
    </SafeAreaView>
  );
}
