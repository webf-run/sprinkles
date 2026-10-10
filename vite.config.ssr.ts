import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

import { defineConfig } from 'vite';
import solid from 'vite-plugin-solid';

const pkg = JSON.parse(readFileSync('./package.json', 'utf-8')) as {
  dependencies?: Record<string, string>;
  peerDependencies?: Record<string, string>;
};

const externals = [
  ...Object.keys(pkg.dependencies ?? {}),
  ...Object.keys(pkg.peerDependencies ?? {}),
].map((name) => new RegExp(`^${name}(/.*)?$`));

/**
 * Server build -> dist/server.js
 *
 * Same components, compiled by Solid for server rendering (Astro, SSR, static
 * generation). Runs after the browser build, so it must not empty `dist/`.
 */
export default defineConfig({
  plugins: [solid({ ssr: true, solid: { generate: 'ssr', hydratable: true } })],

  build: {
    outDir: 'dist',
    emptyOutDir: false,
    copyPublicDir: false,
    sourcemap: false,

    lib: {
      entry: resolve(import.meta.dirname, 'lib/index.ts'),
      formats: ['es'],
      fileName: () => 'server.js',
    },

    rolldownOptions: {
      external: externals,
      output: { entryFileNames: 'server.js' },
    },
  },
});
