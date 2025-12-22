// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // GitHub Pages base path – must match repo name
  base: '/',
  build: {
    // 👇 Build into /docs for GitHub Pages
    outDir: 'docs',
  },
})
