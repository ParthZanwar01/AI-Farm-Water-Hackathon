import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  server: {
    historyApiFallback: {
      index: '/index.html'
    },
  },
  preview: {
    historyApiFallback: {
      index: '/index.html'
    },
  },
});
