import { useResponsive } from '@/hooks/useResponsive';
import { Search, SlidersHorizontal } from 'lucide-react-native';
import React from 'react';
import { TextInput, TouchableOpacity, View } from 'react-native';

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  onFilterPress: () => void;
}

export function SearchBar({ value, onChangeText, onFilterPress }: SearchBarProps) {
  const { heightPercent,moderateVerticalScale,moderateScale} = useResponsive()
  return (
    <View className="flex-row px-4 space-x-3">
      <View className="flex-1 flex-row items-center bg-white dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-800" style={{elevation:2,height:heightPercent(6),paddingVertical:moderateVerticalScale(2),paddingStart:moderateScale(10),paddingEnd:moderateScale(5)}}>
        <Search color="#9CA3AF" size={20} strokeWidth={2} />
        <TextInput
          className="flex-1 text-gray-800 ml-3"
          placeholder="Search"
          placeholderTextColor="#9CA3AF"
          value={value}
          onChangeText={onChangeText}
        />
      <TouchableOpacity
        className="w-12 h-full bg-gray-700 dark:bg-slate-900 rounded-xl justify-center items-center"
        onPress={onFilterPress}
      >
        <SlidersHorizontal color="#FFFFFF" size={20} strokeWidth={2} />
      </TouchableOpacity>
      </View>
    </View>
  );
}
