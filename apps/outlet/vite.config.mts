/// <reference types='vitest' />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import * as path from 'path';

export default defineConfig(() => ({
  resolve: {
    alias: {
      '@lib/ui': path.resolve(__dirname, '../../libs/ui/src'),
      '@lib/api-client': path.resolve(__dirname, '../../libs/api-client/src'),
    },
  },
  root: import.meta.dirname,
  cacheDir: '../../node_modules/.vite/apps/outlet',
  server: {
    port: 4000,
    host: 'localhost',
  },
  preview: {
    port: 4000,
    host: 'localhost',
  },
  plugins: [react()],
  // Uncomment this if you are using workers.
  // worker: {
  //  plugins: [],
  // },
  build: {
    outDir: './dist',
    emptyOutDir: true,
    reportCompressedSize: true,
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  },
}));
