import { useResponsive } from '@/hooks/useResponsive';
import * as Slot from '@rn-primitives/slot';
import { cn } from 'lib/utils';
import * as React from 'react';
import { Text as RNText, TextStyle } from 'react-native';

const TextClassContext = React.createContext<string | undefined>(undefined);

// Define semantic size mapping (values are base font sizes in points)
const fontSizeMap: Record<
  'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl',
  number
> = {
  xs: 10,
  sm: 12,
  md: 14,
  lg: 15,
  xl: 16,
  xxl: 18,
};

type TextProps = React.ComponentProps<typeof RNText> & {
  ref?: React.RefObject<RNText>;
  asChild?: boolean;
  size?: keyof typeof fontSizeMap;
};

function Text({
  className,
  asChild = false,
  size = 'xs',
  style,
  ...props
}: TextProps) {
  const textClass = React.useContext(TextClassContext);
  const Component = asChild ? Slot.Text : RNText;
  const { moderateScale } = useResponsive();

  // Get scaled font size
  const fontSize = moderateScale(fontSizeMap[size]);

  const combinedStyle: TextStyle = {
    fontSize,
    ...(style as TextStyle),
  };

  return (
    <Component
      className={cn('text-black dark:text-white  web:select-text ', textClass, className)}
      style={combinedStyle}
      {...props}
    />
  );
}

export { Text, TextClassContext };

