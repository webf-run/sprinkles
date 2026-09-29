import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import solid from 'vite-plugin-solid';

const pkg = JSON.parse(readFileSync('./package.json', 'utf-8')) as {
  dependencies?: Record<string, string>;
  peerDependencies?: Record<string, string>;
};

// Everything the library imports at runtime is left for the consumer's
// bundler to resolve. Includes deep imports such as `solid-js/web`.
const externals = [
  ...Object.keys(pkg.dependencies ?? {}),
  ...Object.keys(pkg.peerDependencies ?? {}),
].map((name) => new RegExp(`^${name}(/.*)?$`));

export default defineConfig({
  plugins: [
    solid(),
    tailwindcss(),
    dts({
      tsconfigPath: './tsconfig.lib.json',
      entryRoot: 'lib',
      include: ['lib'],
      exclude: ['lib/entry.ts', 'lib/env.d.ts'],
    }),
  ],

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
});
