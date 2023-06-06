import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import UnoCSS from 'unocss/vite'
import { viteMockServe } from 'vite-plugin-mock'
import { svgsprites } from './vite_plugins/svgsprites'

export default defineConfig((env) => {
  const { command } = env
  return {
    server: {
      proxy: {
        '/api/': {
          target: 'http://121.196.236.94:8080/',
          changeOrigin: false,
        },
      }
    },
    define: {
      isDev: command === 'serve'
    },
    plugins: [
      UnoCSS(),
      react(),
      viteMockServe(),
      svgsprites({ noOptimizeList: ['pig','logo', 'chart', 'category', 'export', 'noty', 'calendar'] })
    ]
  }
})
