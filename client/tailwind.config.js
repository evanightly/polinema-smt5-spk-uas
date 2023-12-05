/** @type {import('tailwindcss').Config} */

const defaultComponents = {
  '--rounded-btn': '6px',
  '--rounded-badge': '1.9rem',
  '--animation-btn': '.25s',
  '--animation-input': '.2s',
  '--btn-text-case': 'uppercase',
  '--navbar-padding': '.5rem',
  '--border-btn': '1px',
}

export default {
  content: [
    './src/**/*.{html,js,svelte,ts}',
  ],
  darkMode: 'class',
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        light: {
          primary: '#2979ff',
          'primary-focus': '#1d39c4',
          'primary-content': '#ffffff',
          secondary: '#f000b8',
          'secondary-focus': '#bd0091',
          'secondary-content': '#ffffff',
          accent: '#37cdbe',
          'accent-focus': '#2ba69a',
          'accent-content': '#ffffff',
          neutral: '#3b424e',
          'neutral-focus': '#2a2e37',
          'neutral-content': '#ffffff',
          'base-100': '#ffffff',
          'base-200': '#f9fafb',
          'base-300': '#ced3d9',
          'base-content': '#1e2734',
          info: '#1c92f2',
          success: '#009485',
          warning: '#ff9900',
          error: '#ff5724',
          ...defaultComponents
        },
        dark: {
          primary: '#ff1744',
          'primary-focus': '#9c0000',
          'primary-content': '#ffffff',
          secondary: '#e040fb',
          'secondary-focus': '#9c27b0',
          'secondary-content': '#000000',
          accent: '#4dd0e1',
          'accent-focus': '#00acc1',
          'accent-content': '#000000',
          neutral: '#bdbdbd',
          'neutral-focus': '#9e9e9e',
          'neutral-content': '#000000',
          'base-100': '#121212',
          'base-200': '#212121',
          'base-300': '#303030',
          'base-content': '#ffffff',
          info: '#2196f3',
          success: '#4caf50',
          warning: '#ff9800',
          error: '#f44336',
          ...defaultComponents
        },
      }
    ], // true: all themes | false: only light + dark | array: specific themes like this ["light", "dark", "cupcake"]
    darkTheme: "dark", // name of one of the included themes for dark mode
    base: true, // applies background color and foreground color for root element by default
    styled: true, // include daisyUI colors and design decisions for all components
    utils: true, // adds responsive and modifier utility classes
    rtl: false, // rotate style direction from left-to-right to right-to-left. You also need to add dir="rtl" to your html tag and install `tailwindcss-flip` plugin for Tailwind CSS.
    prefix: "", // prefix for daisyUI classnames (components, modifiers and responsive class names. Not colors)
    logs: true, // Shows info about daisyUI version and used config in the console when building your CSS
  },
}

