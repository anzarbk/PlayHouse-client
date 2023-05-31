import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

//https://vitejs.dev/config/
export default defineConfig({
  build: {
    outDir: 'build', // set the output directory to build
  },
  plugins: [react()],
});
