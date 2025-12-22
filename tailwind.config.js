/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{jsx,tsx}", "./app.{jsx,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        'rose': {
          50: '#fff1f2',
          100: '#ffe4e6',
          200: '#fecdd3',
          300: '#fda4af',
          400: '#fb7185',
          500: '#f43f5e',
          600: '#e11d48',
          700: '#be123c',
          800: '#9f1239',
          900: '#881337',
        },
        'pink': {
          50: '#fdf2f8',
          100: '#fce7f3',
          200: '#fbcfe8',
          300: '#f9a8d4',
          400: '#f472b6',
          500: '#ec4899',
          600: '#db2777',
          700: '#be185d',
          800: '#9d174d',
          900: '#831843',
        }
      },
      fontFamily: {
        // Regular weights for body text
        'instrument': ['InstrumentSans-Regular'],
        'instrument-medium': ['InstrumentSans-Medium'], 
        'instrument-semibold': ['InstrumentSans-SemiBold'],
        'instrument-bold': ['InstrumentSans-Bold'],
        
        // Semi-condensed for headings (more elegant)
        'instrument-sc': ['InstrumentSans_SemiCondensed-Regular'],
        'instrument-sc-medium': ['InstrumentSans_SemiCondensed-Medium'],
        'instrument-sc-semibold': ['InstrumentSans_SemiCondensed-SemiBold'],
        'instrument-sc-bold': ['InstrumentSans_SemiCondensed-Bold'],
        
        // Condensed for special elements
        'instrument-condensed': ['InstrumentSans_Condensed-Regular'],
        'instrument-condensed-medium': ['InstrumentSans_Condensed-Medium'],
        'instrument-condensed-semibold': ['InstrumentSans_Condensed-SemiBold'],
        'instrument-condensed-bold': ['InstrumentSans_Condensed-Bold'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'scale': 'scale 0.2s ease-in-out',
      }
    },
  },
  plugins: [],
}
