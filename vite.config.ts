import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      manifest: {
        name: 'CrypWallet',
        short_name: 'CW',
        description: 'Billetera de criptomonedas',
        theme_color: '#006400',
        background_color: '#000000',
        display: 'standalone',
        display_override: ['window-controls-overlay'],
        lang: 'en',
        icons: [
          {
            src: 'icon-64x64.png',
            sizes: '64x64',
            type: 'image/png',
          },
          {
            src: 'icon-192x192.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'any',
          },
          {
            src: 'icon-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
          },
        ],
      },
      registerType: 'autoUpdate',
    }),
  ],
  server: {
    host: true,
    port: 3000,
  },
  preview: {
    host: true,
    port: 3002,
  },
});
