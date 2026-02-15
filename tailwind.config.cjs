/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './popup.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        minecraft: ['Minecraft', 'FusionPixel', 'sans-serif'],
      },
    },
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: [
      {
        minecraft: {
          'primary': '#5B8731',       // Minecraft 草地绿
          'primary-content': '#ffffff',
          'secondary': '#8B6914',     // 泥土棕
          'secondary-content': '#ffffff',
          'accent': '#3C8527',        // 苦力怕绿
          'accent-content': '#ffffff',
          'neutral': '#373737',       // 石头灰
          'neutral-content': '#e0e0e0',
          'base-100': '#2C2C2C',      // 深色背景
          'base-200': '#232323',
          'base-300': '#1a1a1a',
          'base-content': '#e0e0e0',
          'info': '#55AAFF',
          'success': '#5B8731',
          'warning': '#FFAA00',
          'error': '#FF5555',
        },
      },
    ],
  },
}
