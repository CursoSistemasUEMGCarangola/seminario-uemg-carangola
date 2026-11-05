import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    VitePWA({
      registerType: 'prompt',
      includeAssets: ['favicon.ico', 'icons/*.png'],
      manifest: {
        id: '/',
        name: 'Seminário de Pesquisa e Extensão UEMG Carangola',
        short_name: 'Seminário UEMG',
        description:
          'Consulta rápida e offline da programação de Atividades e Apresentações Orais do Seminário UEMG Carangola',
        lang: 'pt-BR',
        dir: 'ltr',
        scope: '/',
        start_url: '/?source=pwa',
        display: 'standalone',
        orientation: 'portrait',
        theme_color: '#1e3a8a',
        background_color: '#f8fafc',
        categories: ['education', 'events'],
        prefer_related_applications: false,
        icons: [
          {
            src: '/icons/icon-192x192.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'any'
          },
          {
            src: '/icons/icon-192x192-maskable.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'maskable'
          },
          {
            src: '/icons/icon-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any'
          },
          {
            src: '/icons/icon-512x512-maskable.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable'
          }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,json,svg}'],
        cleanupOutdatedCaches: true,
        clientsClaim: true,
        skipWaiting: false
      }
    })
  ]
});

