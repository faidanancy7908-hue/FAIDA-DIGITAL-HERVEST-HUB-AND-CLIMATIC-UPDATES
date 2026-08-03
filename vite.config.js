import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['apple-touch-icon.png', 'farm_logo.png', 'bountiful_harvest.png', 'farmer_garden_yield.png', 'pwa-192x192.png', 'pwa-512x512.png', 'favicon.svg'],
      manifest: {
        name: 'FAIDA Harvest Hub',
        short_name: 'Harvest Hub',
        description: 'Digital Climate Responses and Harvest Hub for Farmers',
        theme_color: '#0f172a', // slate-950
        background_color: '#0f172a',
        display: 'standalone',
        icons: [
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable'
          }
        ]
      }
    })
  ],
  base: '/FAIDA-DIGITAL-HERVEST-HUB-AND-CLIMATIC-UPDATES/',
})
