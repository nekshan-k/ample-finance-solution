'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme, primaryColors, type PrimaryColor } from '@/app/context/ThemeContext'
import { Palette, Moon, Sun, Droplet, Sparkles } from 'lucide-react'

export default function FloatingThemeButton() {
  const { isDarkMode, primaryColor, colorIntensity, gradientIntensity, useGradient, setIsDarkMode, setPrimaryColor, setColorIntensity, setGradientIntensity, setUseGradient } = useTheme()
  const [isOpen, setIsOpen] = useState(false)

  const colorNames: { [key in PrimaryColor]: string } = {
    blue: 'Blue',
    purple: 'Purple',
    emerald: 'Emerald',
    rose: 'Rose',
    amber: 'Amber',
    cyan: 'Cyan',
    indigo: 'Indigo',
    pink: 'Pink',
    teal: 'Teal',
    orange: 'Orange',
    red: 'Red',
    green: 'Green'
  }

  const colorEmojis: { [key in PrimaryColor]: string } = {
    blue: '🔵',
    purple: '🟣',
    emerald: '💚',
    rose: '🌹',
    amber: '🟡',
    cyan: '🔷',
    indigo: '🟦',
    pink: '💗',
    teal: '🩵',
    orange: '🟠',
    red: '🔴',
    green: '🟢'
  }

  return (
    <>
      <motion.div
        className="fixed right-4 bottom-8 z-40 sm:right-6 sm:bottom-12"
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className={`relative w-14 h-14 sm:w-16 sm:h-16 rounded-full text-white shadow-xl flex items-center justify-center ${
            useGradient ? 'bg-gradient-to-br from-primary via-primary to-secondary-500' : 'bg-primary'
          }`}
        >
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.4 }}
            className="relative z-10"
          >
            <Palette className="w-6 h-6 sm:w-7 sm:h-7 text-white drop-shadow-lg" />
          </motion.div>
        </motion.button>
      </motion.div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.2 }}
            className="fixed right-2 bottom-20 sm:right-6 sm:bottom-28 z-50 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-primary/20 w-[calc(100vw-1rem)] sm:w-80 max-w-sm max-h-[calc(100vh-8rem)] overflow-hidden flex flex-col"
          >
            <div className={`p-4 border-b border-primary/10 ${useGradient ? 'bg-gradient-to-r from-primary/5 to-transparent' : 'bg-primary/5'}`}>
              <h3 className="text-xs font-bold text-primary/70 uppercase tracking-wider mb-3 flex items-center gap-2">
                <Sun className="w-3 h-3" /> Theme Mode
              </h3>
              <div className="flex gap-2">
                <motion.button
                  onClick={() => setIsDarkMode(false)}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className={`flex-1 flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg text-sm font-semibold transition-all duration-300 ${
                    !isDarkMode
                      ? `${useGradient ? 'bg-gradient-to-r from-primary/20 to-secondary-500/20' : 'bg-primary/20'} border-2 border-primary/40 text-primary shadow-sm`
                      : 'border-2 border-transparent text-primary/50 hover:text-primary hover:bg-primary/5'
                  }`}
                >
                  <Sun className="w-4 h-4" />
                  Light
                </motion.button>
                <motion.button
                  onClick={() => setIsDarkMode(true)}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className={`flex-1 flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg text-sm font-semibold transition-all duration-300 ${
                    isDarkMode
                      ? `${useGradient ? 'bg-gradient-to-r from-primary/20 to-secondary-500/20' : 'bg-primary/20'} border-2 border-primary/40 text-primary shadow-sm`
                      : 'border-2 border-transparent text-primary/50 hover:text-primary hover:bg-primary/5'
                  }`}
                >
                  <Moon className="w-4 h-4" />
                  Dark
                </motion.button>
              </div>
            </div>

            <div className="p-4 border-b border-primary/10 max-h-[30vh] overflow-y-auto flex-shrink-0">
              <h3 className="text-xs font-bold text-primary/70 uppercase tracking-wider mb-3 flex items-center gap-2">
                <Palette className="w-3 h-3" /> Color Palette
              </h3>
              <div className="grid grid-cols-3 gap-2">
                {(Object.keys(colorNames) as PrimaryColor[]).map((c) => (
                  <motion.button
                    key={c}
                    onClick={() => setPrimaryColor(c)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`flex flex-col items-center gap-1.5 p-2.5 rounded-lg transition-all duration-300 ${
                      primaryColor === c
                        ? `${useGradient ? 'bg-gradient-to-br from-primary/15 to-secondary-500/15' : 'bg-primary/15'} border-2 border-primary/40 shadow-sm`
                        : 'hover:bg-primary/5 border-2 border-transparent'
                    }`}
                  >
                    <motion.div
                      className="w-8 h-8 rounded-full shadow-md"
                      style={{
                        backgroundColor: primaryColors[c][500],
                      }}
                      animate={primaryColor === c ? { scale: [1, 1.1, 1] } : {}}
                      transition={{ duration: 0.3 }}
                    />
                    <span className="text-xs font-medium">{colorNames[c]}</span>
                  </motion.button>
                ))}
              </div>
            </div>

            {!useGradient && (
              <div className="p-4 border-b border-primary/10 flex-shrink-0">
                <h3 className="text-xs font-bold text-primary/70 uppercase tracking-wider mb-3 flex items-center gap-2">
                  <Droplet className="w-3 h-3" /> Color Intensity
                </h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <input
                      type="range"
                      min="60"
                      max="140"
                      value={colorIntensity}
                      onChange={(e) => setColorIntensity(Number(e.target.value))}
                      className="flex-1 h-2 bg-primary/10 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary [&::-webkit-slider-thumb]:shadow-md [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-primary [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:shadow-md"
                    />
                    <span className="text-sm font-semibold text-primary min-w-[3rem] text-right">
                      {colorIntensity}%
                    </span>
                  </div>
                  <div className="flex justify-between text-xs text-primary/50">
                    <span>Subtle</span>
                    <span>Vibrant</span>
                  </div>
                </div>
              </div>
            )}

            {useGradient && (
              <div className="p-4 border-b border-primary/10 flex-shrink-0">
                <h3 className="text-xs font-bold text-primary/70 uppercase tracking-wider mb-3 flex items-center gap-2">
                  <Sparkles className="w-3 h-3" /> Gradient Intensity
                </h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <input
                      type="range"
                      min="60"
                      max="140"
                      value={gradientIntensity}
                      onChange={(e) => setGradientIntensity(Number(e.target.value))}
                      className="flex-1 h-2 bg-gradient-to-r from-primary/10 to-secondary-500/10 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-gradient-to-r [&::-webkit-slider-thumb]:from-primary [&::-webkit-slider-thumb]:to-secondary-500 [&::-webkit-slider-thumb]:shadow-md [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-primary [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:shadow-md"
                    />
                    <span className="text-sm font-semibold text-primary min-w-[3rem] text-right">
                      {gradientIntensity}%
                    </span>
                  </div>
                  <div className="flex justify-between text-xs text-primary/50">
                    <span>Soft</span>
                    <span>Bold</span>
                  </div>
                </div>
              </div>
            )}

            <div className="p-4 flex-shrink-0">
              <h3 className="text-xs font-bold text-primary/70 uppercase tracking-wider mb-3 flex items-center gap-2">
                <Sparkles className="w-3 h-3" /> Style Mode
              </h3>
              <div className="flex gap-2">
                <motion.button
                  onClick={() => setUseGradient(false)}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className={`flex-1 flex flex-col items-center gap-1.5 p-3 rounded-lg text-sm font-semibold transition-all duration-300 ${
                    !useGradient
                      ? 'bg-primary/20 border-2 border-primary/40 text-primary shadow-sm'
                      : 'border-2 border-transparent text-primary/50 hover:text-primary hover:bg-primary/5'
                  }`}
                >
                  <div className="w-8 h-8 rounded-md" style={{ backgroundColor: primaryColors[primaryColor][500] }} />
                  Solid
                </motion.button>
                <motion.button
                  onClick={() => setUseGradient(true)}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className={`flex-1 flex flex-col items-center gap-1.5 p-3 rounded-lg text-sm font-semibold transition-all duration-300 ${
                    useGradient
                      ? 'bg-gradient-to-r from-primary/20 to-secondary-500/20 border-2 border-primary/40 text-primary shadow-sm'
                      : 'border-2 border-transparent text-primary/50 hover:text-primary hover:bg-primary/5'
                  }`}
                >
                  <div className="w-8 h-8 rounded-md bg-gradient-to-br from-primary to-secondary-500" />
                  Gradient
                </motion.button>
              </div>
            </div>

            <div className="px-4 py-2.5 border-t border-primary/10 bg-primary/5 flex-shrink-0">
              <p className="text-[10px] text-primary/50 text-center">
                ✨ Changes applied instantly
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 z-30 bg-black/20 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>
    </>
  )
}

