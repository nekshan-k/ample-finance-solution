'use client';

import { useTheme } from '@/app/context/ThemeContext';

export function useThemeClasses() {
  const { useGradient } = useTheme();

  const getColorClass = (gradientClass: string, solidClass?: string) => {
    if (!solidClass) {
      solidClass = gradientClass.replace('gradient', 'solid');
    }
    return useGradient ? gradientClass : solidClass;
  };

  return {
    primaryBg: useGradient ? 'gradient-primary' : 'solid-primary',
    secondaryBg: useGradient ? 'gradient-to-secondary' : 'solid-to-secondary',
    textGradient: useGradient ? 'gradient-text' : 'solid-text',
    getColorClass,
  };
}
