import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  build: {
    chunkSizeWarningLimit: 1000, // Atur batas ukuran (default: 500 KB)
  },
  plugins: [react()],
  base: '/',
})
