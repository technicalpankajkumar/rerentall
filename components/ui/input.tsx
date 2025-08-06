import { useColorScheme } from '@/lib/useColorScheme';
import { cn } from 'lib/utils';
import { Eye, EyeOff } from 'lucide-react-native';
import React, { forwardRef, useState } from 'react';
import {
  Pressable,
  TextInput,
  TextInputProps,
  View,
} from 'react-native';
import { Text } from './text';

type InputSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

type CustomInputProps = TextInputProps & {
  size?: InputSize;
  prefix?: React.ReactNode;
  postfix?: React.ReactNode;
  secureToggle?: boolean;
  error?: string | boolean;
  className?: string;
  placeholderClassName?: string;
  label?: string;
  radius?: InputSize,
  required?:boolean,
};

export const Input = forwardRef<TextInput, CustomInputProps>(({
  size = 'md',
  prefix,
  postfix,
  secureToggle = false,
  error = false,
  className,
  placeholderClassName,
  secureTextEntry,
  label,
  radius = 'md',
  required = false,
  ...props
}, ref) => {
  const [isSecure, setIsSecure] = useState(secureTextEntry ?? false);
  const [isFocused, setIsFocused] = useState(false);
  const {isDarkColorScheme} = useColorScheme()
  const sizeStyles = {
    xs: 'h-8 px-2 text-xs',
    sm: 'h-10 px-3 text-sm',
    md: 'h-12 px-4 text-base',
    lg: 'h-14 px-4 text-lg',
    xl: 'h-14 px-4 text-xl',
  };

  const baseBorder = 'border';
  const borderColor = error
    ? 'border-red-500'
    : isFocused
      ? 'border-primary'
      : 'border-input';

  const labelPosition = isFocused || props.value ? '-top-2 ' : 'top-2 text-muted-foreground';

  return (
    <View className="w-full relative my-0.5">
      {/* {label && (
        <View className='flex-row gap-1 mx-0.5'><Text
          className={cn(
            'absolute left-3 bg-background px-1 z-10 transition-all',
            labelPosition
          )}
          size={size}
        >
          {label}
        </Text>
        {required && <Text className='text-red-500' size={size}>
            *
          </Text>
      }
      )} </View>*/}

      {
        label && (<View className='flex-row gap-1 mx-0.5'>
          <Text
            className={cn('mb-1 text-gray-600 dark:text-gray-300')}
            size={size}
          >
            {label}
          </Text>
          {required && <Text className='text-red-500' size={size}>
            *
          </Text>}
        </View>)
      }
      <View
        className={cn(
          'flex-row items-center  bg-background',
          baseBorder,
          `rounded-${radius}`,
          sizeStyles[size],
          borderColor,
          props.editable === false && 'opacity-50',
          className
        )}
      >
        {prefix && <View className="mr-2">{prefix}</View>}

        <TextInput
          ref={ref}
          secureTextEntry={isSecure}
          placeholderTextColor="gray"
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={cn(
            'flex-1 text-foreground',
            `text-${size}`,
            placeholderClassName,

          )}
          {...props}
        />

        {secureToggle && (
          <Pressable onPress={() => setIsSecure(prev => !prev)} className="ml-2">
            {isSecure ? <EyeOff size={20} color={isDarkColorScheme ? '#9ca3af' : '#6b7280'} /> : <Eye size={20} color={isDarkColorScheme ? '#9ca3af' : '#6b7280'}/>}
          </Pressable>
        )}

        {postfix && <View className="ml-2">{postfix}</View>}
      </View>

      {error && typeof error === 'string' && (
        <Text className="text-red-500 mt-0.5" size={size}>{error}</Text>
      )}
    </View>
  );
});

Input.displayName = 'Input';
