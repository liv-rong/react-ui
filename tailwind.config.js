/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  plugins: [],
  corePlugins: {
    // preflight: false
  },
  theme: {
    extend: {
      width: {
        1000: '1000px'
      },
      height: {
        600: '600px'
      },
      margin: {
        100: '100px'
      }
    }
  }
}
