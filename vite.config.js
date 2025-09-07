import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // --- AÑADE ESTE BLOQUE DE CÓDIGO ---
  server: {
    proxy: {
      // Cualquier petición que empiece con '/api_db' será redirigida.
      '/api_db': {
        // La URL de tu servidor PHP.
        // Asegúrate de que apunte a la carpeta raíz de tu proyecto en XAMPP.
        target: 'http://localhost',
        changeOrigin: true,
        secure: false,
      },
    }
  }
  // ------------------------------------
})