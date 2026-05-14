/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        carbon: {
          DEFAULT: '#0A0A0A',
          2: '#12121a',
          3: '#1A1A2E',
        },
        f1red: '#DC0000',
        glow: '#00D9FF',
        titanium: '#E8E8E8',
        danger: '#FF0000',
        papaya: '#FF6B35',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'ui-monospace', 'monospace'],
      },
      boxShadow: {
        glow: '0 0 20px rgba(0, 212, 255, 0.3)',
        'glow-red': '0 0 24px rgba(220, 0, 0, 0.35)',
      },
      backgroundImage: {
        'carbon-radial':
          'radial-gradient(ellipse 120% 80% at 50% -20%, #1A1A2E 0%, #0A0A0A 55%, #050508 100%)',
      },
    },
  },
  plugins: [],
};
