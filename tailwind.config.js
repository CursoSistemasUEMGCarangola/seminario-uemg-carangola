/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,html}",
  ],
  theme: {
    extend: {
      colors: {
        uemg: {
          blue: {
            DEFAULT: '#1e3a8a', // Azul institucional UEMG
            dark: '#172554',
            light: '#3b82f6',
            surface: '#eff6ff',
          },
          pink: {
            DEFAULT: '#db2777', // Rosa/Magenta de destaque do logo P&e
            dark: '#be185d',
            light: '#f472b6',
            surface: '#fdf2f8',
          }
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
      }
    },
  },
  plugins: [],
}

