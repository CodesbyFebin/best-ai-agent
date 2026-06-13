import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss()],
    base: '/client/',
    publicDir: false,
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      hmr: process.env.DISABLE_HMR !== 'true',
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
    build: {
      outDir: path.resolve(__dirname, 'dist/client'),
      emptyOutDir: true,
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('/node_modules/react') || id.includes('/node_modules/react-dom')) return 'vendor-react';
            if (id.includes('/node_modules/lucide-react')) return 'vendor-lucide';
            if (id.includes('/src/components/ProductProfile')) return 'page-product';
            if (id.includes('/src/components/ComparisonPage')) return 'page-comparison';
            if (id.includes('/src/components/GoogleDriveDashboard')) return 'page-drive';
            if (id.includes('/src/components/TopicalAuthorityMap')) return 'page-authority-map';
            return undefined;
          },
        },
      },
    },
  };
});
