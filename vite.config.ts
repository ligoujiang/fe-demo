import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
// 加载环境变量
export default defineConfig({
  plugins: [vue(), vueDevTools()],
  base: '/fe-demo/', // 注意：前后都有斜杠！
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    // proxy: {
    //   // 将 /api 开头的请求代理到后端
    //   '/api': {
    //     target: 'http://localhost:8080',
    //     changeOrigin: true,
    //     rewrite: (path) => path.replace(/^\/api/, '/v1'), // http://localhost:8080/api->http://localhost:8080/v1
    //   },
    // },
    proxy: {
      '/v1': {
        // ✅ 代理 /v1 开头的请求
        target: 'http://localhost:8080',
        changeOrigin: true,
      },
    },
  },
})
