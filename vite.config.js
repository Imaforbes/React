import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Proxy para evitar CORS en desarrollo. Redirige /api_db a Apache en localhost
      '/api_db': {
        target: 'http://localhost',
        changeOrigin: true,
        secure: false,
      },
      // Proxy adicional para rutas /api
      '/api': {
        target: 'http://localhost',
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
