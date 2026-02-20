/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        orbitron: ['Orbitron', 'sans-serif'],
        rajdhani: ['Rajdhani', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        neon: '0 0 18px rgba(220, 38, 38, 0.6)',
      },
      animation: {
        pulseSlow: 'pulse 3s infinite',
      },
    },
  },
  plugins: [],
};
