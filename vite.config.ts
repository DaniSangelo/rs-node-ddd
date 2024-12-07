import { defineConfig } from 'vite';

export default defineConfig({
  test: {
    globals: true, // Ativa o uso de globais no Vitest
    environment: 'node', // Configura o ambiente de teste
  },
});
