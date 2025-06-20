import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import dotenv from 'dotenv';
dotenv.config();
// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@zenra/components': path.resolve(__dirname, 'src/components'),
      '@zenra/layouts': path.resolve(__dirname, 'src/layout'),
      '@zenra/configs': path.resolve(__dirname, 'src/libs/configs'),
      '@zenra/widgets': path.resolve(__dirname, 'src/libs/widgets'),
      '@zenra/pages': path.resolve(__dirname, 'src/pages'),
      '@zenra/api': path.resolve(__dirname, 'src/libs/api'),
      '@zenra/model': path.resolve(__dirname, 'src/libs/models'),
      '@zenra/controller': path.resolve(__dirname, 'src/libs/controllers'),
      '@zenra/functions': path.resolve(__dirname, 'src/libs/functions'),
      '@zenra/services': path.resolve(__dirname, 'src/libs/services'),
      '@zenra/store': path.resolve(__dirname, 'src/libs/store'),
    }
  }
});
