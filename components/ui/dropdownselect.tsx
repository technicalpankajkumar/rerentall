import { useResponsive } from '@/hooks/useResponsive';
import { useColorScheme } from '@/lib/useColorScheme';
import AntDesign from '@expo/vector-icons/AntDesign';
import { cn } from 'lib/utils';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Dropdown, MultiSelect } from 'react-native-element-dropdown';
import { Text } from './text';

type RadiusSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | 'full';
type SizeProps = 'xs' | 'sm' | 'md' | 'lg';

type DropdownItem = {
  label: string;
  value: string | number;
};

type DropdownSelectProps = {
  label?: string;
  required?: boolean;
  error?: string | boolean;
  placeholder?: string;
  data: DropdownItem[];
  value: string | number | null | Array<string | number>;
  onChange: (item: any) => void;
  className?: string;
  placeholderClassName?: string;
  postfix?: React.ReactNode;
  prefix?: React.ReactNode;
  prefixIconName?: any;
  searchable?: boolean;
  radius?: RadiusSize;
  size?: SizeProps;
  multi?: boolean;
  disable?: boolean;
  maxSelect?: number;
  renderItem?: (item: DropdownItem, selected?: boolean) => React.ReactNode;
  renderSelectedItem?: (item: DropdownItem, unSelect?: () => void) => React.ReactNode;
  dropdownPosition?: 'auto' | 'top' | 'bottom';
};

export const DropdownSelect = ({
  label,
  required = false,
  error = false,
  placeholder = 'Select item',
  data,
  value,
  onChange,
  className,
  placeholderClassName,
  postfix,
  prefix,
  prefixIconName = 'Safety',
  searchable = true,
  radius = 'md',
  size = 'md',
  multi = false,
  disable = false,
  maxSelect,
  renderItem,
  renderSelectedItem,
  dropdownPosition = 'auto',
}: DropdownSelectProps) => {
  const [isFocus, setIsFocus] = useState(false);
  const { isDarkColorScheme } = useColorScheme();
  const { moderateScale, verticalScale } = useResponsive();

  const sizeStyles = {
    xs: { fontSize: moderateScale(12) - 1 },
    sm: { fontSize: moderateScale(13) - 1 },
    md: { fontSize: moderateScale(14) - 1 },
    lg: { fontSize: moderateScale(16) - 1 },
  };
  const boxStyles = {
    xs: { height: verticalScale(40) },
    sm: { height: verticalScale(42) },
    md: { height: verticalScale(45) },
    lg: { height: verticalScale(46) },
  };

  const borderColor = error
    ? 'border-red-500'
    : isFocus
    ? 'border-primary'
    : 'border-input';

  const DropdownComponent = multi ? MultiSelect : Dropdown;

  return (
    <View className="w-full my-0.5">
      {label && (
        <View className="flex-row gap-1 mx-0.5 mb-1">
          <Text className={cn('text-gray-600 dark:text-gray-300')}>
            {label}
          </Text>
          {required && (
            <Text className="text-red-500" style={[sizeStyles[size]]}>
              *
            </Text>
          )}
        </View>
      )}

      <View
        className={cn(
          'bg-background border flex-row items-center',
          `rounded-${radius}`,
          borderColor,
          className
        )}
        style={{ ...boxStyles[size], paddingHorizontal: moderateScale(10) }}
      >
        <DropdownComponent
          disable={disable}
          style={StyleSheet.flatten([
            {
              flex: 1,
              borderWidth: 0,
              backgroundColor: 'transparent',
            },
          ])}
          containerStyle={{
            backgroundColor: isDarkColorScheme ? '#1e1e1e' : '#fff',
          }}
          placeholderStyle={{
            color: isDarkColorScheme ? '#9ca3af' : '#6b7280',
            ...sizeStyles[size],
          }}
          selectedTextStyle={{
            color: isDarkColorScheme ? '#e5e7eb' : '#111827',
            ...sizeStyles[size],
          }}
          inputSearchStyle={{
            ...boxStyles[size],
            ...sizeStyles[size],
            color: isDarkColorScheme ? '#e5e7eb' : '#111827',
          }}
          iconStyle={{
            width: 20,
            height: 20,
          }}
          activeColor={isDarkColorScheme ? '#2a2a2a' : '#f4f4f5'}
          data={data}
          maxHeight={300}
          labelField="label"
          valueField="value"
          value={value}
          search={searchable}
          placeholder={placeholder}
          searchPlaceholder="Search..."
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={(item: any) => {
            onChange(multi ? item : item.value);
            setIsFocus(false);
          }}
          renderItem={renderItem}
          renderSelectedItem={renderSelectedItem}
          dropdownPosition={dropdownPosition}
          maxSelect={multi ? maxSelect : undefined}
          renderLeftIcon={() =>
            prefix || (
              <AntDesign
                name={prefixIconName}
                size={20}
                color={isFocus ? '#4A86F7' : isDarkColorScheme ? '#9ca3af' : '#6b7280'}
                style={{ marginRight: 6 }}
              />
            )
          }
        />

        {postfix && <View className="ml-0.5">{postfix}</View>}
      </View>

      {error && typeof error === 'string' && (
        <Text className="text-red-500 mt-0.5" style={{ ...sizeStyles[size] }}>
          {error}
        </Text>
      )}
    </View>
  );
};
