'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme, primaryColors, type PrimaryColor } from '@/app/context/ThemeContext'
import { Palette, Moon, Sun } from 'lucide-react'

export default function FloatingThemeButton() {
  const { isDarkMode, primaryColor, setIsDarkMode, setPrimaryColor } = useTheme()
  const [isOpen, setIsOpen] = useState(false)

  const colorNames: { [key in PrimaryColor]: string } = {
    blue: 'Blue',
    purple: 'Purple',
    emerald: 'Emerald',
    rose: 'Rose',
    amber: 'Amber',
    cyan: 'Cyan'
  }

  const colorEmojis: { [key in PrimaryColor]: string } = {
    blue: '🔵',
    purple: '🟣',
    emerald: '💚',
    rose: '🌹',
    amber: '🟡',
    cyan: '🔷'
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
          whileHover={{ scale: 1.15 }}
          whileTap={{ scale: 0.95 }}
          className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-primary via-primary to-secondary-500 text-white shadow-2xl flex items-center justify-center group hover:shadow-2xl transition-all duration-300"
        >
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-primary/30"
            animate={{ scale: [1, 1.3, 1], opacity: [1, 0, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-secondary-500/30"
            animate={{ scale: [1, 1.3, 1], opacity: [1, 0, 1] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
          />

          <motion.div
            animate={{ rotate: isOpen ? 360 : 0 }}
            transition={{ duration: 0.6 }}
            className="relative z-10"
          >
            <Palette className="w-8 h-8 sm:w-10 sm:h-10 text-white drop-shadow-lg" />
          </motion.div>
          <motion.div
            className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/40 to-secondary-500/40 blur-xl"
            animate={{ opacity: [0.5, 0.8, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.button>
      </motion.div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.3 }}
            className="fixed right-1 bottom-24 sm:right-6 sm:bottom-28 z-50 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-primary/20 overflow-hidden w-[calc(100vw-1rem)] sm:w-72 lg:w-80 max-w-xs backdrop-blur-xl"
          >
            <div className="p-5 border-b border-primary/10 bg-gradient-to-r from-primary/5 to-transparent">
              <h3 className="text-xs font-bold text-primary/60 uppercase tracking-wider mb-4">
                ☀️ Light / Dark Mode
              </h3>
              <div className="flex gap-3">
                <motion.button
                  onClick={() => setIsDarkMode(false)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-semibold transition-all duration-300 ${
                    !isDarkMode
                      ? 'bg-gradient-to-r from-primary/30 to-secondary-500/30 border-2 border-primary/50 text-primary'
                      : 'border-2 border-transparent text-primary/60 hover:text-primary hover:bg-primary/5'
                  }`}
                >
                  <Sun className="w-5 h-5" />
                  Light
                </motion.button>
                <motion.button
                  onClick={() => setIsDarkMode(true)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-semibold transition-all duration-300 ${
                    isDarkMode
                      ? 'bg-gradient-to-r from-primary/30 to-secondary-500/30 border-2 border-primary/50 text-primary'
                      : 'border-2 border-transparent text-primary/60 hover:text-primary hover:bg-primary/5'
                  }`}
                >
                  <Moon className="w-5 h-5" />
                  Dark
                </motion.button>
              </div>
            </div>

            <div className="p-5">
              <h3 className="text-xs font-bold text-primary/60 uppercase tracking-wider px-2 mb-4">
                🌈 Primary Color
              </h3>
              <div className="space-y-3">
                {(Object.keys(colorNames) as PrimaryColor[]).map((c) => (
                  <motion.button
                    key={c}
                    onClick={() => {
                      setPrimaryColor(c)
                      setIsOpen(false)
                    }}
                    whileHover={{ x: 6, scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300 ${
                      primaryColor === c
                        ? 'bg-gradient-to-r from-primary/20 to-secondary-500/20 border-2 border-primary/50 shadow-lg'
                        : 'hover:bg-primary/5 border-2 border-transparent'
                    }`}
                  >
                    <span className="text-2xl">{colorEmojis[c]}</span>
                    <span className="flex-1 text-left font-semibold">{colorNames[c]}</span>
                    <motion.div
                      className="w-5 h-5 rounded-full border-3 border-white shadow-md"
                      style={{
                        backgroundColor: primaryColors[c][500],
                      }}
                    />
                    {primaryColor === c && (
                      <motion.div
                        layoutId="activeColor"
                        className="w-3 h-3 rounded-full bg-white dark:bg-slate-900 border-2 border-primary absolute right-4"
                        transition={{ duration: 0.3 }}
                      />
                    )}
                  </motion.button>
                ))}
              </div>
            </div>

            <div className="px-5 py-3 border-t border-primary/10 bg-primary/5">
              <p className="text-xs text-primary/60 text-center">
                Changes saved automatically
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
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-30"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>
    </>
  )
}

