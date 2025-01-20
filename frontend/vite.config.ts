import path from 'node:path'
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'

import tailwind from 'tailwindcss'
import autoprefixer from 'autoprefixer'

export default defineConfig({
  css: {
    postcss: {
      plugins: [tailwind(), autoprefixer()],
    },
  },
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    proxy: {
      // Proxy requests to your backend API
      '/auth': {
        target: 'http://localhost:5000', // Your backend URL
        changeOrigin: true, // This helps with CORS issues
        secure: false, // Use false if you're not using HTTPS
        rewrite: (path) => path.replace(/^\/auth/, ''), // Optional, removes `/auth` prefix
      },
    },
  },
})