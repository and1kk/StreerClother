/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        'surface-container-low': '#1b1b1b',
        'surface-container': '#1f1f1f',
        'surface-container-high': '#2a2a2a',
        'surface-container-lowest': '#0e0e0e',
        'surface-container-highest': '#353535',
        'surface': '#131313',
        'surface-variant': '#353535',
        'primary': '#ffffff',
        'on-primary': '#2f3131',
        'outline-variant': '#444748',
        'outline': '#8e9192',
        'on-surface': '#e2e2e2',
        'on-surface-variant': '#c4c7c8',
        'error': '#ffb4ab',
        'on-error': '#690005'
      },
      spacing: {
        'margin-mobile': '1rem',
        'space-xs': '0.25rem',
        'space-sm': '0.5rem',
        'space-md': '1rem',
        'margin': '1.5rem',
        'space-lg': '2rem',
        'space-xl': '4rem',
      },
      fontFamily: {
        'display': ['Anton', 'sans-serif'],
        'headline-lg': ['Anton', 'sans-serif'],
        'headline-md': ['Anton', 'sans-serif'],
        'headline-sm': ['Space Grotesk', 'sans-serif'],
        'body-lg': ['Space Grotesk', 'sans-serif'],
        'body-md': ['Space Grotesk', 'sans-serif'],
        'body-sm': ['Space Grotesk', 'sans-serif'],
        'mono': ['JetBrains Mono', 'monospace'],
        'label-sm': ['JetBrains Mono', 'monospace'],
        'label-md': ['JetBrains Mono', 'monospace'],
        'label-lg': ['JetBrains Mono', 'monospace']
      },
      fontSize: {
        'label-sm': ['10px', { lineHeight: '12px', letterSpacing: '0.1em' }],
        'label-md': ['11px', { lineHeight: '14px', letterSpacing: '0.08em' }],
        'label-lg': ['13px', { lineHeight: '16px', letterSpacing: '0.06em' }],
        'body-sm': ['13px', { lineHeight: '18px' }],
        'body-md': ['15px', { lineHeight: '22px' }],
        'body-lg': ['18px', { lineHeight: '26px' }],
        'headline-sm': ['22px', { lineHeight: '28px', letterSpacing: '-0.02em' }],
        'headline-md': ['32px', { lineHeight: '36px', letterSpacing: '-0.02em' }],
        'headline-lg': ['56px', { lineHeight: '58px', letterSpacing: '-0.03em' }],
      }
    }
  },
  plugins: []
};
