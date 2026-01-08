'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

export type Theme = 'light' | 'dark'
export type PrimaryColor = 'blue' | 'purple' | 'emerald' | 'rose' | 'amber' | 'cyan' | 'indigo' | 'pink' | 'teal' | 'orange' | 'red' | 'green'

interface ColorShades {
  50: string
  500: string
  600: string
}

interface ThemeContextType {
  isDarkMode: boolean
  primaryColor: PrimaryColor
  colorIntensity: number
  gradientIntensity: number
  useGradient: boolean
  setIsDarkMode: (isDark: boolean) => void
  setPrimaryColor: (color: PrimaryColor) => void
  setColorIntensity: (intensity: number) => void
  setGradientIntensity: (intensity: number) => void
  setUseGradient: (useGradient: boolean) => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

function hexToRgb(hex: string): string {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  if (!result) return '0 0 0'
  return `${parseInt(result[1], 16)} ${parseInt(result[2], 16)} ${parseInt(result[3], 16)}`
}

function hexToHSL(hex: string): string {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  if (!result) return '0 0% 0%'
  
  let r = parseInt(result[1], 16) / 255
  let g = parseInt(result[2], 16) / 255
  let b = parseInt(result[3], 16) / 255
  
  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  let h = 0, s = 0
  const l = (max + min) / 2
  
  if (max !== min) {
    const d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
    
    switch (max) {
      case r:
        h = ((g - b) / d + (g < b ? 6 : 0)) / 6
        break
      case g:
        h = ((b - r) / d + 2) / 6
        break
      case b:
        h = ((r - g) / d + 4) / 6
        break
    }
  }
  
  return `${Math.round(h * 360)} ${Math.round(s * 100)}% ${Math.round(l * 100)}%`
}

export const primaryColors: Record<PrimaryColor, ColorShades> = {
  blue: {
    50: '#eff6ff',
    500: '#3b82f6',
    600: '#2563eb'
  },
  purple: {
    50: '#f3f0ff',
    500: '#a855f7',
    600: '#9333ea'
  },
  emerald: {
    50: '#f0fdf4',
    500: '#10b981',
    600: '#059669'
  },
  rose: {
    50: '#fff5f7',
    500: '#f43f5e',
    600: '#e11d48'
  },
  amber: {
    50: '#fffbeb',
    500: '#f59e0b',
    600: '#d97706'
  },
  cyan: {
    50: '#ecf0ff',
    500: '#06b6d4',
    600: '#0891b2'
  },
  indigo: {
    50: '#eef2ff',
    500: '#6366f1',
    600: '#4f46e5'
  },
  pink: {
    50: '#fdf2f8',
    500: '#ec4899',
    600: '#db2777'
  },
  teal: {
    50: '#f0fdfa',
    500: '#14b8a6',
    600: '#0d9488'
  },
  orange: {
    50: '#fff7ed',
    500: '#f97316',
    600: '#ea580c'
  },
  red: {
    50: '#fef2f2',
    500: '#ef4444',
    600: '#dc2626'
  },
  green: {
    50: '#f0fdf4',
    500: '#22c55e',
    600: '#16a34a'
  }
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [isDarkMode, setIsDarkModeState] = useState<boolean>(false)
  const [primaryColor, setPrimaryColorState] = useState<PrimaryColor>('blue')
  const [colorIntensity, setColorIntensityState] = useState<number>(100)
  const [gradientIntensity, setGradientIntensityState] = useState<number>(100)
  const [useGradient, setUseGradientState] = useState<boolean>(true)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const savedDarkMode = localStorage.getItem('isDarkMode') === 'true'
    const savedColor = localStorage.getItem('primaryColor') as PrimaryColor
    const savedIntensity = parseInt(localStorage.getItem('colorIntensity') || '100')
    const savedGradientIntensity = parseInt(localStorage.getItem('gradientIntensity') || '100')
    const savedGradient = localStorage.getItem('useGradient') !== 'false'
    
    if (localStorage.getItem('isDarkMode') !== null) {
      setIsDarkModeState(savedDarkMode)
    }
    if (savedColor && Object.keys(primaryColors).includes(savedColor)) {
      setPrimaryColorState(savedColor)
    }
    setColorIntensityState(savedIntensity)
    setGradientIntensityState(savedGradientIntensity)
    setUseGradientState(savedGradient)

    if (savedDarkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [])

  useEffect(() => {
    if (!mounted) return
    
    const root = document.documentElement
    const primaryShades = primaryColors[primaryColor]
    const intensity = colorIntensity / 100

    root.style.setProperty('--primary', hexToHSL(primaryShades[500]))
    
    root.style.setProperty('--primary-50', hexToRgb(primaryShades[50]))
    root.style.setProperty('--primary-500', hexToRgb(primaryShades[500]))
    root.style.setProperty('--primary-600', hexToRgb(primaryShades[600]))
    root.style.setProperty('--color-intensity', intensity.toString())
    root.style.setProperty('--gradient-intensity', (gradientIntensity / 100).toString())

    localStorage.setItem('isDarkMode', isDarkMode.toString())
    localStorage.setItem('primaryColor', primaryColor)
    localStorage.setItem('colorIntensity', colorIntensity.toString())
    localStorage.setItem('gradientIntensity', gradientIntensity.toString())
    localStorage.setItem('useGradient', useGradient.toString())

    if (isDarkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [isDarkMode, primaryColor, colorIntensity, gradientIntensity, useGradient, mounted])

  const setIsDarkMode = (isDark: boolean) => {
    setIsDarkModeState(isDark)
  }

  const setPrimaryColor = (color: PrimaryColor) => {
    setPrimaryColorState(color)
  }

  const setColorIntensity = (intensity: number) => {
    setColorIntensityState(intensity)
  }

  const setGradientIntensity = (intensity: number) => {
    setGradientIntensityState(intensity)
  }

  const setUseGradient = (gradient: boolean) => {
    setUseGradientState(gradient)
  }

  return (
    <ThemeContext.Provider value={{ 
      isDarkMode, 
      primaryColor, 
      colorIntensity, 
      gradientIntensity, 
      useGradient, 
      setIsDarkMode, 
      setPrimaryColor, 
      setColorIntensity, 
      setGradientIntensity, 
      setUseGradient 
    }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider')
  }
  return context
}

