import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { VitePWA } from 'vite-plugin-pwa'


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(),VitePWA({
    injectRegister: 'auto',
    includeAssets: ['logo.svg', 'social180x180.png', 'logo.svg'],
      manifest: {
        name: 'قروبات الجامعة',
        short_name: 'قروبات',
        description: 'البحث عن قروبات الجامعة',
        theme_color: '#ffffff',
        icons: [
          {
            src: 'social192x192.png',
            sizes: '192x192',
            type: '/'
          },
          {
            src: 'social512x512.png',
            sizes: '512x512',
            type: '/'
          }
        ]
      }
  })],
  esbuild: {
    drop: ['console', 'debugger'],
  },
})
