import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());
  const VITE_API_BASE_URL = env.VITE_API_BASE_URL;

  return {
    plugins: [
      react(),
      VitePWA({
        manifest: {
          name: 'CrypWallet',
          short_name: 'Cryp Wallet',
          description: 'Billetera de criptomonedas',
          theme_color: '#1e59ea',
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
      port: 3000,
      proxy: {
        '/api': {
          ws: true,
          target: VITE_API_BASE_URL,
          changeOrigin: true,
          secure: false,
        },
      },
    },
    preview: {
      host: true,
      port: 3002,
    },
  };
});
