import { useResponsive } from '@/hooks/useResponsive';
import { useColorScheme } from '@/lib/useColorScheme';
import { cn } from '@/lib/utils';
import { Barcode as Barn, Building, Building2, Home, HousePlug, TreePine } from 'lucide-react-native';
import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';

interface Category {
  id: string;
  name: string;
  icon: React.ReactNode;
}

interface CategorySelectorProps {
  selectedCategory: string;
  onCategorySelect: (category: string) => void;
}

const categories: Category[] = [
  { id: 'House', name: 'House', icon: <Home size={20} strokeWidth={2} /> },
  { id: 'Villa', name: 'Villa', icon: <Building2 size={20} strokeWidth={2} /> },
  { id: 'Apartment', name: 'Apartment', icon: <Building size={20} strokeWidth={2} /> },
  { id: 'Bungalow', name: 'Bungalow', icon: <TreePine size={20} strokeWidth={2} /> },
  { id: 'Farmhouse', name: 'Farmhouse', icon: <Barn size={20} strokeWidth={2} /> },
  { id: 'Pg', name: 'PG', icon: <HousePlug size={20} strokeWidth={2} /> },
];

export function CategorySelector({ selectedCategory, onCategorySelect }: CategorySelectorProps) {
  const {heightPercent,widthPercent} = useResponsive();
  const {isDarkColorScheme} = useColorScheme();
  return (
    <View className="px-1">
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ gap: 16 }}
      >
        {categories.map((category, index) => (
          <Animated.View key={category.id} entering={FadeInDown.delay(index * 50)}>
            <TouchableOpacity
              className="items-center min-w-[40px]"
              onPress={() => onCategorySelect(category.id)}
            >
              <View
                className={cn(
                  'rounded-full justify-center items-center mb-1',
                  selectedCategory === category.id ? 'bg-blue-300' : 'bg-gray-100 dark:bg-slate-800',
                )}
                style={{height:heightPercent(6),width:widthPercent(12)}}
              >
                {React.cloneElement(category.icon as React.ReactElement, {
                  color: selectedCategory === category.id ? '#3B82F6' : '#6B7280',
                })}
              </View>
              <Text
                className={cn(
                  'text-xs text-center font-medium',
                  selectedCategory === category.id ? 'text-blue-500 font-semibold' : 'text-gray-500'
                )}
              >
                {category.name}
              </Text>
            </TouchableOpacity>
          </Animated.View>
        ))}
      </ScrollView>
    </View>
  );
}
