'use client';

import { useTheme } from '@/app/context/ThemeContext';
import { cn } from '@/app/lib/utils';

interface ThemeBackgroundProps {
  children: React.ReactNode;
  className?: string;
  type?: 'primary' | 'secondary' | 'text';
}

export function ThemeBackground({ children, className, type = 'primary' }: ThemeBackgroundProps) {
  const { useGradient } = useTheme();
  
  const getColorClass = () => {
    if (type === 'text') {
      return useGradient ? 'gradient-text' : 'solid-text';
    }
    if (type === 'secondary') {
      return useGradient ? 'gradient-to-secondary' : 'solid-to-secondary';
    }
    return useGradient ? 'gradient-primary' : 'solid-primary';
  };
  
  return (
    <div className={cn(getColorClass(), className)}>
      {children}
    </div>
  );
}
