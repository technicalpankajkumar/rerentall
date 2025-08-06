import { useResponsive } from '@/hooks/useResponsive';
import { Search, SlidersHorizontal } from 'lucide-react-native';
import React from 'react';
import { View } from 'react-native';
import { Input } from '../ui/input';

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  onFilterPress: () => void;
}

export function SearchBar({ value, onChangeText, onFilterPress }: SearchBarProps) {
  const { heightPercent,moderateVerticalScale,moderateScale} = useResponsive()
  return (
    <View className="flex-row px-4 space-x-3">
      <View className="flex-1 flex-row items-center" style={{height:heightPercent(6),paddingVertical:moderateVerticalScale(2)}}>

        <Input
          radius='xl'
          size='md'
          prefix={<Search color="#9CA3AF" size={20} strokeWidth={2} />}
          placeholder="Search"
          className='shadow-sm'
          placeholderTextColor="#9CA3AF"
          value={value}
          onChangeText={onChangeText}
          postfix={<SlidersHorizontal color="#9CA3AF" size={20} strokeWidth={2} />}

        />
      </View>
    </View>
  );
}
