import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  test: {
    globals: true, // Ativa o uso de globais no Vitest
    environment: 'node', // Configura o ambiente de teste
  },
});
