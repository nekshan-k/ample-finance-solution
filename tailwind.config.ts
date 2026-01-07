import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./app/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', '"DM Sans"', 'system-ui', 'sans-serif'],
        display: ['"Plus Jakarta Sans"', 'sans-serif'],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          "50": "rgb(var(--primary-50) / <alpha-value>)",
          DEFAULT: "hsl(var(--primary))",
          "500": "rgb(var(--primary-500) / <alpha-value>)",
          "600": "rgb(var(--primary-600) / <alpha-value>)",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          "50": "rgb(var(--secondary-50) / <alpha-value>)",
          DEFAULT: "hsl(var(--secondary))",
          "500": "rgb(var(--secondary-500) / <alpha-value>)",
          "600": "rgb(var(--secondary-600) / <alpha-value>)",
          foreground: "hsl(var(--secondary-foreground))",
        },
        neutral: {
          "50": "rgb(var(--neutral-50) / <alpha-value>)",
          "100": "rgb(var(--neutral-100) / <alpha-value>)",
          "700": "rgb(var(--neutral-700) / <alpha-value>)",
          "900": "rgb(var(--neutral-900) / <alpha-value>)",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        success: {
          DEFAULT: "hsl(var(--success))",
          foreground: "hsl(var(--success-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        xl: "calc(var(--radius) + 4px)",
        "2xl": "calc(var(--radius) + 8px)",
      },
      boxShadow: {
        glow: "0 0 40px -10px hsl(var(--primary) / 0.3)",
        "glow-lg": "0 0 60px -15px hsl(var(--primary) / 0.4)",
        soft: "0 2px 15px -3px hsl(var(--foreground) / 0.08), 0 4px 6px -4px hsl(var(--foreground) / 0.05)",
        card: "0 4px 20px -5px hsl(var(--foreground) / 0.1)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        pulse: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.5" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        shimmer: "shimmer 2s linear infinite",
        pulse: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
