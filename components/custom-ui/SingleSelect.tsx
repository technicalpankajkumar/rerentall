import { useResponsive } from '@/hooks/useResponsive';
import useStyles from '@/hooks/useStyles';
import { useColorScheme } from '@/lib/useColorScheme';
import { cn } from '@/lib/utils';
import { AntDesign } from '@expo/vector-icons';
import React, { useState } from 'react';
import { FlatList, Modal, Pressable, TouchableOpacity, View } from 'react-native';
import { Input } from '../ui/input';
import { Text } from '../ui/text';
import Label from './Label';

export type SingleSelectTypeProps = {
  label: string;
  value: string | number;
};

type InputSize = 'xs' | 'sm' | 'md' | 'lg';
type RadiusSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' |'full'

type DropdownSelectProps = {
  label?: string;
  required?: boolean;
  error?: string | boolean;
  placeholder?: string;
  data: SingleSelectTypeProps[];
  value: SingleSelectTypeProps | undefined;
  onChange: (item: SingleSelectTypeProps) => void;
  searchable?: boolean;
  prefixIconName?: keyof typeof AntDesign.glyphMap;
  size?:InputSize,
  radius?:RadiusSize
};

const SingleSelect = ({
  label = 'Select Type',
  required,
  error,
  placeholder = 'Select Type',
  data,
  value,
  onChange,
  searchable = true,
  prefixIconName = 'Safety',
  size='md',
  radius = 'md'
}: DropdownSelectProps) => {
  const [isFocus, setIsFocus] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [searchText, setSearchText] = useState('');
  const { isDarkColorScheme } = useColorScheme();
  const {moderateScale,verticalScale}= useResponsive()
  const {fontSizeStyles,boxSizeStyles} = useStyles()

  const filteredData = data.filter(item =>
    item.label.toLowerCase().includes(searchText.toLowerCase())
  );

  const borderColor = error
    ? 'border-red-500'
    : isFocus
      ? 'border-primary'
      : 'border-input';

  return (
    <View className="w-full">
      <Label title={label} required={required} size={size}/>
      <TouchableOpacity
        className={cn(
          'flex-row bg-background items-center justify-between border rounded-md px-3 py-3',
          borderColor,
          `rounded-${radius}`,
        )}
        activeOpacity={0.9}
        onPress={() => {
          setIsFocus(true);
          setModalVisible(true);
        }}
        style={[{paddingHorizontal: moderateScale(10)},boxSizeStyles[size]]}
      >
        <View className="flex-row items-center gap-2 flex-1">
          {prefixIconName && (
            <AntDesign
              name={prefixIconName}
              size={20}
              className='mr-0.5'
              color={isFocus ? '#4A86F7' : isDarkColorScheme ? '#9ca3af' : '#6b7280'}
            />
          )}
          <Text
            className={cn(
              value?.label ? 'text-gray-600 dark:text-gray-300' : 'text-gray-400 dark:text-gray-500'
            )}
            style={fontSizeStyles[size]}
          >
            {value?.label || placeholder}
          </Text>
        </View>

        <AntDesign name="down" size={16} color="#9ca3af" />
      </TouchableOpacity>

      {error && typeof error === 'string' && (
        <Text className="text-red-500 mt-1 text-sm">{error}</Text>
      )}

      {/* MODAL */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
          setIsFocus(false);
        }}
      >
        <Pressable
          className="flex-1 justify-center items-center bg-black/30"
          onPressOut={() => {
            setModalVisible(false);
            setIsFocus(false);
          }}
        >
          <View
            className={cn(
              'w-[90%] max-h-[60%] bg-white dark:bg-zinc-900 rounded-lg p-4',
              isDarkColorScheme ? 'border border-zinc-700' : ''
            )}
          >
            {searchable && (
              <Input
                size={size}
                value={searchText}
                onChangeText={setSearchText}
                placeholder="Search..."
                placeholderTextColor={isDarkColorScheme ? '#9ca3af' : '#6b7280'}
                radius={radius}
              />
            )}

            <FlatList
              data={filteredData}
              keyExtractor={(item) => item.value.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity
                  className="px-4 py-2 rounded hover:bg-gray-100 dark:hover:bg-zinc-800"
                  onPress={() => {
                    onChange(item);
                    setModalVisible(false);
                    setIsFocus(false);
                    setSearchText('');
                  }}
                >
                  <Text className="text-gray-600 dark:text-gray-300" size={size}>{item.label}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </Pressable>
      </Modal>
    </View>
  );
};

export default SingleSelect
