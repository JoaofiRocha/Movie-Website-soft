import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer'


// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    ViteImageOptimizer({
      jpeg: {
        quality: 75,
        progressive: true,
      },
      webp: {
        enabled: true,
        quality: 75,
      },
      avif: {
        enabled: true,
        quality: 75,
      },
    }),
  ],
  server: {
    host: true,
    port: 5173,
  },
  css: {
    modules: {
      localsConvention: 'camelCase',
      generateScopedName: '[name]__[local]___[hash:base64:5]'
    }
  }
})
