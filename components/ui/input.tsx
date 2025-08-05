import { cn } from 'lib/utils';
import { Eye, EyeOff } from 'lucide-react-native';
import React, { forwardRef, useState } from 'react';
import {
  Pressable,
  Text,
  TextInput,
  TextInputProps,
  View,
} from 'react-native';

type InputSize = 'xs' | 'sm' | 'md' | 'lg';

type CustomInputProps = TextInputProps & {
  size?: InputSize;
  prefix?: React.ReactNode;
  postfix?: React.ReactNode;
  secureToggle?: boolean;
  error?: string | boolean;
  className?: string;
  placeholderClassName?: string;
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
  ...props
}, ref) => {
  const [isSecure, setIsSecure] = useState(secureTextEntry ?? false);

  const sizeStyles = {
    xs: 'h-8 px-2 text-xs',
    sm: 'h-10 px-3 text-sm',
    md: 'h-12 px-4 text-base',
    lg: 'h-14 px-4 text-lg',
  };

  const borderColor = error ? 'border-red-500' : 'border-input';

  return (
    <View className="w-full">
      <View
        className={cn(
          'flex-row items-center rounded-md border bg-background',
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
          className={cn(
            'flex-1 text-foreground',
            placeholderClassName
          )}
          {...props}
        />

        {secureToggle && (
          <Pressable onPress={() => setIsSecure(prev => !prev)} className="ml-2">
            {isSecure ? <EyeOff size={20} /> : <Eye size={20} />}
          </Pressable>
        )}

        {postfix && <View className="ml-2">{postfix}</View>}
      </View>

      {error && typeof error === 'string' && (
        <Text className="text-xs text-red-500 mt-1">{error}</Text>
      )}
    </View>
  );
});

Input.displayName = 'Input';
