import { defineConfig } from 'vite';

export default defineConfig({
  root: '.', // project root (optional; default is '.')
  build: {
    outDir: 'dist',             // output directory
    emptyOutDir: true,          // clean output directory before build
    rollupOptions: {
      input: '/src/main.ts'     // specify the entry point explicitly
    }
  }
});
