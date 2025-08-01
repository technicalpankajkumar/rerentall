import React, { useRef, useState } from 'react';
import { Dimensions, Image, TouchableOpacity, View } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';
import Carousel from 'react-native-reanimated-carousel';

const { width, height } = Dimensions.get('window');

interface ImageCarouselProps {
  images: string[];
}

export function ImageCarousel({ images }: ImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef(null);
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
        ref={carouselRef}
        loop
        width={width}
        height={height * 0.35}
        autoPlay={false}
        data={images}
        scrollAnimationDuration={300}
        renderItem={renderItem}
        onSnapToItem={(index) => setCurrentIndex(index)}
        defaultIndex={currentIndex}
      />
      <Animated.View entering={FadeIn} className={'gap-2 absolute bottom-8 left-0 right-0 z-100'} >
        <View className="flex-row w-full gap-2 items-center justify-center" >
          {images?.map((res, index) => (
            <TouchableOpacity key={res} onPress={() => {
              setCurrentIndex(index);
              carouselRef.current?.scrollTo({ index, animated: true });
            }} >
              <Image
                source={{ uri: res }}
                className={`w-16 h-16 rounded-xl border-4 ${index === currentIndex ? 'border-white' : 'border-white/75'
                  }`}
                style={{ elevation: 1 }}
              />
            </TouchableOpacity>
          ))}
        </View>
      </Animated.View>
    </View>
  );
}
