import { Search, SlidersHorizontal } from 'lucide-react-native';
import React from 'react';
import { TextInput, TouchableOpacity, View } from 'react-native';

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  onFilterPress: () => void;
}

export function SearchBar({ value, onChangeText, onFilterPress }: SearchBarProps) {
  return (
    <View className="flex-row px-5 space-x-3">
      <View className="flex-1 flex-row items-center bg-white px-4 py-1 rounded-xl border border-slate-100 " style={{elevation:2}}>
        <Search color="#9CA3AF" size={20} strokeWidth={2} />
        <TextInput
          className="flex-1 text-base text-gray-800 ml-3"
          placeholder="Search"
          placeholderTextColor="#9CA3AF"
          value={value}
          onChangeText={onChangeText}
        />
      <TouchableOpacity
        className="w-12 h-12 bg-gray-700 rounded-xl justify-center items-center"
        onPress={onFilterPress}
      >
        <SlidersHorizontal color="#FFFFFF" size={20} strokeWidth={2} />
      </TouchableOpacity>
      </View>
    </View>
  );
}
