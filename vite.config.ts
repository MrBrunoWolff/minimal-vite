import { defineConfig } from 'vite'

export default defineConfig({
  // Configure server options
  server: {
    port: 3000,
    open: true, // Open browser on server start
  },
  // Configure build options
  build: {
    outDir: 'dist',
    minify: 'terser',
    sourcemap: true,
  },
  // Configure base public path
  base: './',
}) 