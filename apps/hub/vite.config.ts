import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/postcss'
import autoprefixer from 'autoprefixer'

// https://vite.dev/config/
export default defineConfig({
  base: '/',
  server: {
    port: 5173,
    proxy: {
      '/calculus-integration': {
        target: 'http://localhost:5174',
        changeOrigin: true,
      },
      '/resistor-color-code': {
        target: 'http://localhost:5176',
        changeOrigin: true,
      },
      '/error-rate-calculator': {
        target: 'http://localhost:5175',
        changeOrigin: true,
      },
    },
  },
  css: {
    postcss: {
      plugins: [tailwindcss, autoprefixer],
    },
  },
})
