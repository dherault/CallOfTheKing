import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'

const isDev = process.env.NODE_ENV !== 'production'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [tsconfigPaths(), react()],
  build: {
    sourcemap: isDev,
    rollupOptions: {
      cache: isDev ? undefined : false,
    },
  },
  optimizeDeps: {
    exclude: ['firebase', 'firebase/app', 'firebase/auth', 'firebase/firestore', 'firebase/analytics', 'firebase/functions', 'firebase/storage', 'firebase/app-check'],
  },
})
