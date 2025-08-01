import { useColorScheme } from '@/lib/useColorScheme';
import { Moon, Sun } from 'lucide-react-native';
import React from 'react';
import { Pressable } from 'react-native';

export const ToggleTheme = () => {
  const { colorScheme, setColorScheme } = useColorScheme();

  const isDark = colorScheme === 'dark';

  const toggleTheme = () => {
    setColorScheme(isDark ? 'light' : 'dark');
  };

  return (
    <Pressable
      onPress={toggleTheme}
      className="flex-row items-center w-10 justify-center px-5 py-2 rounded-full bg-gray-200 dark:bg-gray-700"
    >
      {isDark ? (
        <Sun size={20} color="#fff" />
      ) : (
        <Moon size={20} color="#000" />
      )}
    </Pressable>
  );
};
