
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import fs from 'fs/promises';
import svgr from 'vite-plugin-svgr';

export default defineConfig({
  resolve: {
    alias: {
      src: resolve(__dirname, 'src'),
    },
  },
  esbuild: {
    loader: 'jsx',
    include: /src\/.*\.jsx?$/,
    exclude: [],
  },
  optimizeDeps: {
    esbuildOptions: {
      plugins: [
        {
          name: 'load-js-files-as-jsx',
          setup(build) {
            build.onLoad(
              { filter: /src\\.*\.js$/ },
              async (args) => ({
                loader: 'jsx',
                contents: await fs.readFile(args.path, 'utf8'),
              })
            );
          },
        },
      ],
    },
  },
  server: {
    proxy: {
      '/uploadsfiles': {
        target: 'http://10.1.2.24:5001', // Dirección del backend
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/uploadsfiles/, '/uploadsfiles'), // Opcional si necesitas cambiar la ruta
      },
      '/get-pdf': {
        target: 'http://10.1.2.24:5001',  // Dirección del backend
        changeOrigin: true,                // Cambia el origen de la solicitud
        rewrite: (path) => path.replace(/^\/get-pdf/, '/get-pdf'), // Asegúrate de que esté correctamente configurado
      },
    },

  },
  plugins: [react(), svgr()],
});

