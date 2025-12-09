import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/fullstack-project3/",
  server: {
    proxy: {
      '/api' : {
        target: 'http://localhost:3000',
        changeOrigin: true,
      }
    }
  }
})

