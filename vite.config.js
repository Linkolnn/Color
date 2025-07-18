import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'), 
      '@js': path.resolve(__dirname, 'src/js'),
      '@styles': path.resolve(__dirname, 'src/styles'), 
    },
  },
  publicDir: 'public',
  build: {
    outDir: 'dist', // Default output directory
  },
});