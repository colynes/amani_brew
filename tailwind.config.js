import type { Config } from 'tailwindcss'

export default {
  content: [
    './resources/**/*.blade.php',
    './resources/**/*.jsx',
    './resources/**/*.js',
  ],
  theme: {
    extend: {
      colors: {
        // Primary Brand Colors
        primary: {
          DEFAULT: '#14532D', // Deep Forest Green
          foreground: 'white',
        },
        emerald: '#16A34A',
        'light-green': '#DCFCE7',
        
        // Secondary / Meat Theme
        burgundy: '#7F1D1D',
        'soft-rose': '#FEE2E2',
        
        // Neutrals
        background: '#F8FAFC',
        'card-bg': '#FFFFFF',
        muted: '#F1F5F9',
        border: '#E2E8F0',
        'primary-text': '#0F172A',
        'secondary-text': '#64748B',
        
        // Status
        success: '#16A34A',
        warning: '#F59E0B',
        info: '#2563EB',
        danger: '#DC2626',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
      },
    },
  },
  plugins: [],
} satisfies Config

