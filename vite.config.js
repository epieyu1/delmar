import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Asegura rutas relativas para compatibilidad total con Hostinger (public_html o subdirectorios)
  base: './',
})
