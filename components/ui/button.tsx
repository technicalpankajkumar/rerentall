import { useResponsive } from '@/hooks/useResponsive';
import { cva, type VariantProps } from 'class-variance-authority';
import { TextClassContext } from 'components/ui/text';
import { cn } from 'lib/utils';
import * as React from 'react';
import {
  Pressable,
  Text,
  useColorScheme,
  ViewStyle
} from 'react-native';

const buttonVariants = cva(
  'group flex items-center justify-center rounded-md web:ring-offset-background web:transition-colors web:focus-visible:outline-none web:focus-visible:ring-2 web:focus-visible:ring-ring web:focus-visible:ring-offset-2',
  {
    variants: {
      variant: {
        default: 'bg-primary web:hover:opacity-90 active:opacity-90',
        destructive: 'bg-destructive web:hover:opacity-90 active:opacity-90',
        outline:
          'border border-input bg-background web:hover:bg-accent web:hover:text-accent-foreground active:bg-accent',
        secondary: 'bg-secondary web:hover:opacity-80 active:opacity-80',
        ghost:
          'web:hover:bg-accent web:hover:text-accent-foreground active:bg-accent',
        link: 'web:underline-offset-4 web:hover:underline web:focus:underline',
      },
      size: {
        default: 'h-10 px-4 py-2 native:h-12 native:px-5 native:py-3',
        sm: 'h-9 rounded-md px-3 native:h-10',
        lg: 'h-11 rounded-md px-8 native:h-14',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

const buttonTextVariants = cva(
  'web:whitespace-nowrap text-sm native:text-base font-medium text-foreground web:transition-colors',
  {
    variants: {
      variant: {
        default: 'text-primary-foreground',
        destructive: 'text-destructive-foreground',
        outline: 'group-active:text-accent-foreground',
        secondary: 'text-secondary-foreground group-active:text-secondary-foreground',
        ghost: 'group-active:text-accent-foreground',
        link: 'text-primary group-active:underline',
      },
      size: {
        default: '',
        sm: '',
        lg: 'native:text-lg',
        icon: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

type radiusTypes = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
type ButtonProps = React.ComponentProps<typeof Pressable> &
  VariantProps<typeof buttonVariants> & {
    style?: ViewStyle;
    children?: React.ReactNode;
    radius?: radiusTypes
  };

function Button({
  className,
  variant,
  size,
  radius = 'md',
  style,
  children,
  ...props
}: ButtonProps) {
  const { moderateScale, moderateVerticalScale, scale } = useResponsive();
  const colorScheme = useColorScheme(); // 'light' | 'dark'

  let selectRadius = (size: radiusTypes) => {
    switch (size) {
      case 'sm':
        return scale(6)
      case 'md':
        return scale(8)
      case 'lg':
        return scale(10)
      case 'xl':
        return scale(12)
      default:
        return scale(4)
    }

  }
  const responsiveStyles: ViewStyle = {
    paddingHorizontal: moderateScale(16),
    height:
      size === 'sm'
        ? moderateVerticalScale(40)
        : size === 'lg'
          ? moderateVerticalScale(56)
          : moderateVerticalScale(48),
    borderRadius: selectRadius(radius)
  };

  const textClass = buttonTextVariants({ variant, size });

  return (
    <Pressable
      className={cn(
        props.disabled && 'opacity-50 web:pointer-events-none',
        buttonVariants({ variant, size, className }),
        colorScheme === 'dark' && 'dark'
      )}
      style={[responsiveStyles, style]}
      {...props}
    >
      <TextClassContext.Provider value={textClass}>
        {typeof children === 'string' ? (
          <Text className={textClass}>{children}</Text>
        ) : (
          children
        )}
      </TextClassContext.Provider>
    </Pressable>
  );
}

export { Button, buttonTextVariants, buttonVariants };
export type { ButtonProps };

