import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'neon-cyan': '#00f5ff',
        'neon-magenta': '#ff00ff',
        'neon-purple': '#9d4edd',
        'neon-green': '#39ff14',
        'dark-bg': '#0a0a0f',
        'dark-card': '#111118',
        'dark-surface': '#1a1a24',
      },
      animation: {
        'glow-pulse': 'glowPulse 2s ease-in-out infinite',
        'neon-flicker': 'neonFlicker 3s ease-in-out infinite',
        'slide-in': 'slideIn 0.3s ease-out',
        'fade-in': 'fadeIn 0.3s ease-out',
      },
      keyframes: {
        glowPulse: {
          '0%, 100%': { boxShadow: '0 0 10px #00f5ff40, 0 0 20px #00f5ff20' },
          '50%': { boxShadow: '0 0 20px #00f5ff80, 0 0 40px #00f5ff40' },
        },
        neonFlicker: {
          '0%, 100%': { opacity: '1', textShadow: '0 0 10px #00f5ff, 0 0 20px #00f5ff, 0 0 40px #00f5ff' },
          '92%': { opacity: '1', textShadow: '0 0 10px #00f5ff, 0 0 20px #00f5ff, 0 0 40px #00f5ff' },
          '93%': { opacity: '0.8', textShadow: 'none' },
          '94%': { opacity: '1', textShadow: '0 0 10px #00f5ff, 0 0 20px #00f5ff, 0 0 40px #00f5ff' },
          '96%': { opacity: '0.9', textShadow: 'none' },
          '97%': { opacity: '1', textShadow: '0 0 10px #00f5ff, 0 0 20px #00f5ff, 0 0 40px #00f5ff' },
        },
        slideIn: {
          '0%': { transform: 'translateX(-100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      boxShadow: {
        'neon-cyan': '0 0 10px #00f5ff40, 0 0 20px #00f5ff20, 0 0 40px #00f5ff10',
        'neon-cyan-lg': '0 0 20px #00f5ff60, 0 0 40px #00f5ff40, 0 0 80px #00f5ff20',
        'neon-magenta': '0 0 10px #ff00ff40, 0 0 20px #ff00ff20, 0 0 40px #ff00ff10',
        'neon-magenta-lg': '0 0 20px #ff00ff60, 0 0 40px #ff00ff40, 0 0 80px #ff00ff20',
        'neon-purple': '0 0 10px #9d4edd40, 0 0 20px #9d4edd20',
        'card': '0 4px 6px rgba(0,0,0,0.5)',
        'card-hover': '0 8px 32px rgba(0,245,255,0.15)',
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}

export default config
