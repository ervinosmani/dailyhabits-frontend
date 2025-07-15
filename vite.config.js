import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // gjitha thirrjet qe fillojne me /api do te ridrejtohen te backend
      '/api': 'http://localhost:8000',
      '/sanctum': 'http://localhost:8000',
    },
  },
});
