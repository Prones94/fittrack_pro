import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'app'),
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    environmentMatchGlobs: [
      ['__tests__/api/**', 'node']
    ],
    clearMocks: true,
    setupFiles: './__tests__/setup.js'
  }
})