import React from 'react';
import { Dimensions, Image, View } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';

const { width, height } = Dimensions.get('window');

interface ImageCarouselProps {
  images: string[];
}

export function ImageCarousel({ images }: ImageCarouselProps) {
  const renderItem = ({ item }: { item: string }) => (
    <View className="flex-1">
      <Image
        source={{ uri: item }}
        className="w-full h-full"
        style={{ resizeMode: 'cover' }}
      />
    </View>
  );

  return (
    <View className="relative">
      <Carousel
        loop
        width={width}
        height={height * 0.45}
        autoPlay={false}
        data={images}
        scrollAnimationDuration={300}
        renderItem={renderItem}
        pagingEnabled
      />
      <View className="absolute bottom-5 left-0 right-0 flex-row justify-center space-x-1.5">
        {images.slice(0, 5).map((_, index) => (
          <View
            key={index}
            className="w-9 h-1 rounded bg-white/70"
          />
        ))}
      </View>
    </View>
  );
}
