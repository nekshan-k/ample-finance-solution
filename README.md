# 💰 Ample Finance - Wealth Management Platform

<div align="center">

![Next.js](https://img.shields.io/badge/Next.js-14.2-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-18.3-61DAFB?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?style=for-the-badge&logo=tailwind-css)

**A modern, feature-rich investment and wealth management platform**

[Features](#-features) • [Getting Started](#-getting-started) • [Documentation](#-documentation) • [Tech Stack](#-tech-stack)

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Getting Started](#-getting-started)
- [Project Structure](#-project-structure)
- [Key Components](#-key-components)
- [Theme System](#-theme-system)
- [Development Guide](#-development-guide)
- [Build & Deployment](#-build--deployment)
- [Contributing](#-contributing)

---

## 🌟 Overview

**Ample Finance** is a comprehensive wealth management platform built with cutting-edge web technologies. It provides users with tools to manage investments, calculate SIP returns, explore financial products, and make informed investment decisions.

### 🎯 Purpose

- 💼 Simplify investment management for everyday investors
- 📊 Provide powerful financial calculators and tools
- 🔒 Ensure secure and transparent financial services
- 🎨 Deliver a beautiful, intuitive user experience

---

## ✨ Features

### 🏠 **Core Features**

- **Dynamic Theme System**
  - 🌓 Dark/Light mode toggle
  - 🎨 6 customizable color schemes (Blue, Purple, Emerald, Rose, Amber, Cyan)
  - 💾 Persistent theme preferences using localStorage

- **SIP Calculator**
  - 📈 Real-time investment calculations
  - 📊 Interactive sliders with visual feedback
  - 💰 Investment breakdown with animated progress bars
  - 🎯 Expected returns and maturity value projections

- **Product Showcase**
  - 💳 Mutual Funds
  - 🏥 Health Insurance
  - 🛡️ Term Insurance
  - 🚗 Motor Insurance

- **Interactive UI Elements**
  - ⚡ Smooth animations using Framer Motion
  - 📱 Fully responsive design (mobile, tablet, desktop)
  - 🎭 Floating theme customizer
  - 🔄 Progressive loading states

### 📄 **Pages**

| Page | Description |
|------|-------------|
| **Home** | Hero section, features, products, testimonials, SIP calculator |
| **About** | Company information, mission, values |
| **Products** | Investment products catalog |
| **Insurance** | Insurance products and plans |
| **Loans** | Loan products and services |
| **Contact** | Contact form and information |
| **404** | Custom not found page |

---

## 🛠️ Tech Stack

### **Frontend Framework**
- **Next.js 14.2** - React framework with App Router
- **React 18.3** - UI library
- **TypeScript 5.8** - Type-safe JavaScript

### **Styling**
- **Tailwind CSS 3.4** - Utility-first CSS framework
- **tailwindcss-animate** - Animation utilities
- **Framer Motion 12** - Animation library
- **class-variance-authority** - CSS variants management

### **UI Components**
- **Radix UI** - Headless UI components
  - Dialog, Dropdown, Tooltip, Slider, Switch, etc.
- **shadcn/ui** - Pre-built component library
- **Lucide React** - Icon library

### **Form Handling**
- **React Hook Form** - Form state management
- **Zod** - Schema validation
- **@hookform/resolvers** - Form validation integration

### **Data Visualization**
- **Recharts** - Chart library for data visualization

### **Utilities**
- **clsx** & **tailwind-merge** - Conditional CSS classes
- **date-fns** - Date manipulation
- **sonner** - Toast notifications

---

## 🚀 Getting Started

### **Prerequisites**

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher)
- **npm** or **yarn** package manager
- **Git** for version control

### **Installation**

Follow these simple steps to get started:

#### **1️⃣ Clone the Repository**

```bash
git clone https://github.com/yourusername/grow-wealth-hub.git
cd grow-wealth-hub-main/grow-wealth-hub-main
```

#### **2️⃣ Install Dependencies**

```bash
npm install
# or
yarn install
```

#### **3️⃣ Start Development Server**

```bash
npm run dev
# or
yarn dev
```

#### **4️⃣ Open in Browser**

Navigate to [http://localhost:3000](http://localhost:3000) to see your application running! 🎉

### **Available Scripts**

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build production bundle |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint for code quality |

---

## 📁 Project Structure

```
grow-wealth-hub-main/
├── app/                          # Next.js App Directory
│   ├── components/               # React Components
│   │   ├── home/                 # Home page sections
│   │   │   ├── HeroSection.tsx
│   │   │   ├── FeaturesSection.tsx
│   │   │   ├── ProductsSection.tsx
│   │   │   ├── SIPCalculator.tsx
│   │   │   ├── TestimonialsSection.tsx
│   │   │   ├── TrustSection.tsx
│   │   │   ├── CTASection.tsx
│   │   │   └── AppDownloadSection.tsx
│   │   ├── layout/               # Layout components
│   │   │   ├── Layout.tsx
│   │   │   ├── Navbar.tsx
│   │   │   └── Footer.tsx
│   │   ├── ui/                   # Reusable UI components
│   │   │   ├── button.tsx
│   │   │   ├── input.tsx
│   │   │   ├── card.tsx
│   │   │   ├── slider.tsx
│   │   │   └── ... (40+ components)
│   │   ├── FloatingThemeButton.tsx
│   │   └── NavLink.tsx
│   ├── context/                  # React Context
│   │   └── ThemeContext.tsx      # Theme management
│   ├── hooks/                    # Custom React hooks
│   │   ├── use-mobile.tsx
│   │   └── use-toast.ts
│   ├── lib/                      # Utility functions
│   │   └── utils.ts
│   ├── pages/                    # Legacy pages (if any)
│   ├── about/                    # About page route
│   │   └── page.tsx
│   ├── contact/                  # Contact page route
│   │   └── page.tsx
│   ├── products/                 # Products routes
│   │   ├── page.tsx
│   │   ├── insurance/
│   │   │   └── page.tsx
│   │   └── loans/
│   │       └── page.tsx
│   ├── layout.tsx                # Root layout
│   ├── page.tsx                  # Home page
│   ├── not-found.tsx             # 404 page
│   └── globals.css               # Global styles
├── public/                       # Static assets
│   └── robots.txt
├── .next/                        # Next.js build output
├── node_modules/                 # Dependencies
├── components.json               # shadcn/ui config
├── tailwind.config.ts            # Tailwind configuration
├── tsconfig.json                 # TypeScript configuration
├── next.config.js                # Next.js configuration
├── postcss.config.js             # PostCSS configuration
├── eslint.config.js              # ESLint configuration
├── package.json                  # Dependencies and scripts
└── README.md                     # This file
```

---

## 🧩 Key Components

### **1. Theme System** 🎨

Located at `app/context/ThemeContext.tsx`

**Features:**
- Dark/Light mode switching
- 6 primary color themes
- Persistent storage using localStorage
- HSL-based color system for smooth transitions

**Usage:**
```tsx
import { useTheme } from '@/app/context/ThemeContext';

function Component() {
  const { isDarkMode, primaryColor, setIsDarkMode, setPrimaryColor } = useTheme();
  
  return (
    <button onClick={() => setIsDarkMode(!isDarkMode)}>
      Toggle Theme
    </button>
  );
}
```

### **2. SIP Calculator** 📊

Located at `app/components/home/SIPCalculator.tsx`

**Features:**
- Monthly investment amount slider (₹500 - ₹100,000)
- Expected return rate slider (1% - 30%)
- Time period slider (1 - 30 years)
- Real-time calculation using `useMemo`
- Visual progress bars with animations
- Detailed investment breakdown

**Formula:**
```
M = P × ({[1 + i]^n – 1} / i) × (1 + i)

Where:
M = Maturity value
P = Monthly investment
i = Monthly interest rate (Annual rate / 12 / 100)
n = Number of months (Years × 12)
```

### **3. Floating Theme Button** 🎭

Located at `app/components/FloatingThemeButton.tsx`

**Features:**
- Fixed position floating button
- Animated reveal panel
- Color picker with emoji indicators
- Mode toggle (Dark/Light)
- Backdrop for modal experience

### **4. Layout System** 📐

Located at `app/components/layout/`

**Components:**
- **Navbar**: Responsive navigation with mobile menu
- **Footer**: Multi-column footer with links and newsletter
- **Layout**: Wrapper component with theme provider

---

## 🎨 Theme System

### **Color Schemes**

The application supports 6 primary color themes:

| Theme | Primary Color | Use Case |
|-------|--------------|----------|
| 🔵 **Blue** | `#3b82f6` | Professional, trustworthy |
| 🟣 **Purple** | `#a855f7` | Creative, modern |
| 💚 **Emerald** | `#10b981` | Growth, success |
| 🌹 **Rose** | `#f43f5e` | Warm, friendly |
| 🟡 **Amber** | `#f59e0b` | Energetic, optimistic |
| 🔷 **Cyan** | `#06b6d4` | Fresh, innovative |

### **Theme Configuration**

Themes are configured using CSS custom properties:

```css
:root {
  --primary: 221 83% 53%;        /* HSL values */
  --secondary: 142 76% 36%;
  --success: 142 76% 36%;
  --foreground: 222 47% 11%;
  --background: 0 0% 100%;
  /* ... more variables */
}

.dark {
  --foreground: 210 40% 98%;
  --background: 222 47% 11%;
  /* ... dark mode overrides */
}
```

### **Adding New Themes**

1. Update `ThemeContext.tsx`:
```tsx
export type PrimaryColor = 'blue' | 'purple' | 'emerald' | 'rose' | 'amber' | 'cyan' | 'newcolor';

export const primaryColors: Record<PrimaryColor, ColorShades> = {
  // ... existing colors
  newcolor: {
    50: '#hexvalue',
    500: '#hexvalue',
    600: '#hexvalue'
  }
};
```

2. Update `FloatingThemeButton.tsx` with new color name and emoji

---

## 💻 Development Guide

### **Code Style**

- Use **TypeScript** for type safety
- Follow **React best practices**
- Use **functional components** with hooks
- Implement **proper error handling**
- Write **descriptive variable names**

### **Component Guidelines**

```tsx
// ✅ Good: Typed, documented, reusable
interface ButtonProps {
  variant?: 'primary' | 'secondary';
  children: React.ReactNode;
  onClick?: () => void;
}

export function Button({ variant = 'primary', children, onClick }: ButtonProps) {
  return (
    <button 
      className={cn('btn', `btn-${variant}`)}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

// ❌ Bad: No types, unclear purpose
export function Btn(props) {
  return <button {...props} />;
}
```

### **State Management**

- Use `useState` for local component state
- Use `useMemo` for expensive calculations
- Use `useCallback` for memoized functions
- Use Context API for global state (theme)

### **Performance Optimization**

```tsx
// Memoize expensive calculations
const calculations = useMemo(() => {
  return calculateSIP(monthlyInvestment, returnRate, timePeriod);
}, [monthlyInvestment, returnRate, timePeriod]);

// Lazy load heavy components
const SIPCalculator = lazy(() => import('./components/SIPCalculator'));

// Optimize images
<Image 
  src="/image.jpg" 
  alt="Description"
  width={800}
  height={600}
  loading="lazy"
/>
```

### **Responsive Design**

Use Tailwind's responsive classes:

```tsx
<div className="
  px-4           // Mobile
  sm:px-6        // Small screens (640px+)
  md:px-8        // Medium screens (768px+)
  lg:px-12       // Large screens (1024px+)
  xl:px-16       // Extra large screens (1280px+)
">
  Content
</div>
```

---

## 🏗️ Build & Deployment

### **Production Build**

```bash
npm run build
```

This creates an optimized production build in the `.next` directory.

**Output:**
```
✓ Compiled successfully
✓ Linting and checking validity of types
✓ Collecting page data
✓ Generating static pages (10/10)
✓ Finalizing page optimization

Route (app)                              Size     First Load JS
┌ ○ /                                    8.2 kB         94.3 kB
├ ○ /about                               142 B          87.5 kB
├ ○ /contact                             142 B          87.5 kB
├ ○ /products                            142 B          87.5 kB
├ ○ /products/insurance                  142 B          87.5 kB
└ ○ /products/loans                      142 B          87.5 kB
```

### **Start Production Server**

```bash
npm run start
```

### **Deployment Options**

#### **Vercel** (Recommended)

1. Push code to GitHub
2. Import project in Vercel
3. Deploy with one click

#### **Manual Deployment**

```bash
# Build the project
npm run build

# Start production server
npm run start
```

#### **Environment Variables**

Create `.env.local` for environment-specific variables:

```env
NEXT_PUBLIC_API_URL=https://api.example.com
NEXT_PUBLIC_SITE_URL=https://amplefinance.com
```

---

## 🤝 Contributing

We welcome contributions! Here's how you can help:

### **Development Workflow**

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Make your changes**
4. **Commit your changes**
   ```bash
   git commit -m 'Add amazing feature'
   ```
5. **Push to the branch**
   ```bash
   git push origin feature/amazing-feature
   ```
6. **Open a Pull Request**

### **Commit Message Guidelines**

```
feat: Add new SIP calculator feature
fix: Resolve theme switching bug
docs: Update README with new sections
style: Format code with Prettier
refactor: Simplify theme context logic
test: Add tests for calculator component
```

### **Code Review Process**

- Ensure all tests pass
- Follow code style guidelines
- Update documentation if needed
- Request review from maintainers

---

## 📚 Additional Resources

### **Documentation**

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)
- [Framer Motion Documentation](https://www.framer.com/motion)

### **Learning Resources**

- [Next.js App Router Guide](https://nextjs.org/docs/app)
- [React Hooks](https://react.dev/reference/react)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
- [Tailwind CSS Tutorial](https://tailwindcss.com/docs/utility-first)

---

## 📞 Support

Having issues? Here's how to get help:

- 📧 **Email**: support@amplefinance.com
- 💬 **Discord**: [Join our community](#)
- 🐛 **Issues**: [GitHub Issues](https://github.com/yourusername/grow-wealth-hub/issues)
- 📖 **Docs**: [Full Documentation](#)

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **shadcn/ui** for the amazing component library
- **Radix UI** for accessible UI primitives
- **Vercel** for hosting and deployment
- **Tailwind Labs** for Tailwind CSS
- All contributors and supporters

---

<div align="center">

### ⭐ Star this repository if you find it helpful!

Made with ❤️ by the Ample Finance Team

[Back to Top](#-ample-finance---wealth-management-platform)

</div>
