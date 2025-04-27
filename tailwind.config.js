/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        metaEmerald: {
          50: '#e6fff9',
          100: '#ccfff3',
          200: '#99ffe7',
          300: '#66ffdb',
          400: '#33ffcf',
          500: '#1AD1B5', // Primary Meta Emernald
          600: '#16a791',
          700: '#117e6d',
          800: '#0b5448',
          900: '#062a24',
        },
        deepCosmos: {
          900: '#000000', // Deep Cosmos Black
          800: '#0a0a0a',
          700: '#141414',
          600: '#1f1f1f',
          500: '#292929',
          400: '#333333',
          300: '#3d3d3d',
          200: '#484848',
          100: '#525252',
          50: '#5c5c5c',
        },
        quantumGrey: {
          500: '#7F7F7F', // Quantum Grey
          400: '#999999',
          300: '#b3b3b3',
          200: '#cccccc',
          100: '#e6e6e6',
          50: '#f2f2f2',
        },
        prismWhite: '#FFFFFF', // Prism White
      },
      fontFamily: {
        manrope: ['Manrope', 'sans-serif'],
      },
      animation: {
        'spin-slow': 'spin 8s linear infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'glitch': 'glitch 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out forwards',
        'fade-in': 'fadeIn 0.5s ease-out forwards',
      },
      keyframes: {
        'pulse-glow': {
          '0%, 100%': {
            opacity: 1,
            filter: 'brightness(1) blur(0px)',
          },
          '50%': {
            opacity: 0.8,
            filter: 'brightness(1.2) blur(1px)',
          },
        },
        'float': {
          '0%, 100%': {
            transform: 'translateY(0)',
          },
          '50%': {
            transform: 'translateY(-10px)',
          },
        },
        'glitch': {
          '0%': {
            transform: 'translate(0)',
          },
          '20%': {
            transform: 'translate(-5px, 5px)',
          },
          '40%': {
            transform: 'translate(-5px, -5px)',
          },
          '60%': {
            transform: 'translate(5px, 5px)',
          },
          '80%': {
            transform: 'translate(5px, -5px)',
          },
          '100%': {
            transform: 'translate(0)',
          },
        },
        'slideUp': {
          from: {
            opacity: 0,
            transform: 'translateY(20px)',
          },
          to: {
            opacity: 1,
            transform: 'translateY(0)',
          },
        },
        'fadeIn': {
          from: {
            opacity: 0,
          },
          to: {
            opacity: 1,
          },
        },
      },
      boxShadow: {
        'glow-sm': '0 0 10px rgba(26, 209, 181, 0.2)',
        'glow': '0 0 20px rgba(26, 209, 181, 0.3)',
        'glow-lg': '0 0 30px rgba(26, 209, 181, 0.4)',
      },
      backdropBlur: {
        xs: '2px',
      },
      transitionTimingFunction: {
        'bounce-soft': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
    },
  },
  plugins: [
    function({ addVariant }) {
      addVariant('show-icon', '&.show-icon');
    }
  ],
};