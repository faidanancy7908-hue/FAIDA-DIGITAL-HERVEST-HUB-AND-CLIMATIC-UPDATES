import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/FAIDA-DIGITAL-HERVEST-HUB-AND-CLIMATIC-UPDATES/',
})
