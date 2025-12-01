import { defineConfig } from 'tsup';
import { copyFileSync } from 'fs';

export default defineConfig({
  entry: ['src/index.jsx'],
  format: ['cjs', 'esm'],
  dts: false,
  splitting: false,
  sourcemap: true,
  clean: true,
  external: ['react', 'react-dom'],
  esbuildOptions(options) {
    options.banner = {
      js: '"use client"',
    };
    // Use automatic JSX runtime to avoid "React is not defined" errors
    options.jsx = 'automatic';
  },
  onSuccess: async () => {
    // Copy styles.css to dist folder
    copyFileSync('src/styles.css', 'dist/styles.css');
    console.log('✓ Copied styles.css to dist/');
  },
});
