/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      screens: {
        '3xl': '1600px',
      },
      maxWidth: {
        pit: '90rem',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'ui-monospace', 'monospace'],
        condensed: ['"Roboto Condensed"', 'Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'pit-hero': [
          'clamp(2.25rem, 5vw, 4.5rem)',
          { lineHeight: '1.02', letterSpacing: '-0.02em', fontWeight: '900' },
        ],
        'pit-page': [
          'clamp(2rem, 4vw, 3.5rem)',
          { lineHeight: '1.06', letterSpacing: '-0.015em', fontWeight: '800' },
        ],
        'pit-section': ['2.5rem', { lineHeight: '1.1', fontWeight: '700' }],
        'pit-card': ['1.5rem', { lineHeight: '1.25', fontWeight: '700' }],
        'pit-countdown': [
          'clamp(3rem, 8vw, 5.25rem)',
          { lineHeight: '1', letterSpacing: '-0.02em', fontWeight: '700' },
        ],
      },
      transitionTimingFunction: {
        pit: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      },
      keyframes: {
        'pit-pulse-slow': {
          '0%, 100%': {
            opacity: '1',
            boxShadow: '0 0 18px rgba(220, 0, 0, 0.35), inset 0 0 0 1px rgba(0, 212, 255, 0.15)',
          },
          '50%': {
            opacity: '0.9',
            boxShadow: '0 0 28px rgba(0, 212, 255, 0.4), inset 0 0 0 1px rgba(220, 0, 0, 0.25)',
          },
        },
        'pit-pulse-fast': {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.82', transform: 'scale(1.01)' },
        },
        'pit-cta-glow': {
          '0%, 100%': { opacity: '0.35' },
          '50%': { opacity: '0.75' },
        },
      },
      animation: {
        'pit-pulse-slow': 'pit-pulse-slow 2s ease-in-out infinite',
        'pit-pulse-fast': 'pit-pulse-fast 1s ease-in-out infinite',
        'pit-cta-glow': 'pit-cta-glow 2.5s ease-in-out infinite',
      },
      colors: {
        carbon: {
          DEFAULT: '#0A0A0A',
          2: '#12121a',
          3: '#1A1A2E',
        },
        'f1-red': '#DC0000',
        f1red: '#DC0000',
        titanium: '#E8E8E8',
        'neon-blue': '#00D9FF',
        glow: '#00D9FF',
        danger: '#FF0000',
        papaya: '#FF6B35',
        champion: '#FFD700',
        record: '#00FF41',
        lamborghini: '#FFB700',
        bugatti: '#001A4D',
        teams: {
          ferrari: '#DC0000',
          mclaren: '#FF6B35',
          redbull: '#1E41FF',
          mercedes: '#00D4FF',
          aston: '#00A651',
          alpine: '#0066FF',
          racingbulls: '#6692FF',
          haas: '#B6BABD',
          kick: '#52E252',
          williams: '#64C4FF',
          cadillac: '#C8A035',
        },
      },
      boxShadow: {
        neon: '0 0 20px rgba(0, 212, 255, 0.3)',
        glow: '0 0 20px rgba(0, 212, 255, 0.3)',
        'glow-red': '0 0 24px rgba(220, 0, 0, 0.35)',
        'glow-subtle': '0 0 12px rgba(0, 212, 255, 0.2)',
        'glow-medium': '0 0 20px rgba(220, 0, 0, 0.25)',
        'glow-intense': '0 0 32px rgba(0, 212, 255, 0.4), inset 0 0 24px rgba(0, 212, 255, 0.08)',
        'card-lift': '0 8px 24px rgba(0, 0, 0, 0.45)',
      },
      backgroundImage: {
        'carbon-radial':
          'radial-gradient(ellipse 120% 80% at 50% -20%, #1A1A2E 0%, #0A0A0A 55%, #050508 100%)',
        'pit-radial':
          'radial-gradient(ellipse 85% 55% at 50% -5%, rgba(30, 65, 255, 0.2), transparent 52%)',
        'pit-linear': 'linear-gradient(180deg, #0A0A0A 0%, #141428 45%, #0A0A0A 100%)',
        'pit-card':
          'linear-gradient(165deg, rgba(26,26,26,0.95) 0%, rgba(15,15,15,0.98) 50%, rgba(10,10,10,0.99) 100%)',
        'pit-sheen':
          'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.06) 50%, transparent 60%)',
      },
    },
  },
  plugins: [],
};
