import { resolve } from 'node:path';

import tailwindcss from '@tailwindcss/vite';
import dts from 'unplugin-dts/vite';
import { defineConfig } from 'vite';
import solid from 'vite-plugin-solid';

import pkg from './package.json' with { type: 'json' };

// Everything the library imports at runtime is left for the consumer's
// bundler to resolve. Includes deep imports such as `solid-js/web`.
const externals = [
  ...Object.keys(pkg.dependencies ?? {}),
  ...Object.keys(pkg.peerDependencies ?? {}),
].map((name) => new RegExp(`^${name}(/.*)?$`));

export default defineConfig({
  build: {
    outDir: 'dist',
    copyPublicDir: false,
    emptyOutDir: true,
    sourcemap: true,
    cssCodeSplit: false,

    lib: {
      entry: resolve(import.meta.dirname, 'lib/entry.ts'),
      formats: ['es'],
      fileName: 'index',
      cssFileName: 'style',
    },

    rolldownOptions: {
      external: externals,
    },
  },
  plugins: [
    solid(),
    tailwindcss(),
    dts({
      tsconfigPath: './tsconfig.lib.json',
      entryRoot: 'lib',
    }),
  ],
});
