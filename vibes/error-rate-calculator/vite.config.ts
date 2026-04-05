import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/postcss'
import autoprefixer from 'autoprefixer'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/error-rate-calculator/',
  server: {
    port: 5175,
  },
  css: {
    postcss: {
      plugins: [tailwindcss, autoprefixer],
    },
  },
})
