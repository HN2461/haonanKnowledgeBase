import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  base: '/haonanKnowledgeBase/', // GitHub Pages的仓库路径
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
})
