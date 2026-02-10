/// <reference types='vitest' />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig(() => ({
  root: import.meta.dirname,
  cacheDir: '../../node_modules/.vite/apps/franchise',
  server: {
    port: 5000,
    host: 'localhost',
  },
  preview: {
    port: 5000,
    host: 'localhost',
  },
  plugins: [react()],
  // Uncomment this if you are using workers.
  // worker: {
  //  plugins: [],
  // },
  resolve: {
    alias: {
      '@lib/ui': path.resolve(__dirname, '../../libs/ui/src'),
      '@lib/api-client': path.resolve(__dirname, '../../libs/api-client/src'),
    },
  },
  build: {
    outDir: '../../dist/apps/franchise',
    emptyOutDir: true,
    reportCompressedSize: true,
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  },
}));
