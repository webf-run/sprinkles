import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

import tailwindcss from '@tailwindcss/vite';
import dts from 'unplugin-dts/vite';
import { type Plugin, defineConfig } from 'vite';
import solid from 'vite-plugin-solid';

import pkg from './package.json' with { type: 'json' };

// Everything the library imports at runtime is left for the consumer's
// bundler to resolve. Includes deep imports such as `solid-js/web`.
const externals = [
  ...Object.keys(pkg.dependencies ?? {}),
  ...Object.keys(pkg.peerDependencies ?? {}),
].map((name) => new RegExp(`^${name}(/.*)?$`));

// Ships the design tokens as plain Tailwind source (`dist/theme.css`).
// A Tailwind v4 app imports it and compiles Sprinkles' classes itself.
const emitTheme: Plugin = {
  name: 'sprinkles:emit-theme',
  generateBundle() {
    this.emitFile({
      type: 'asset',
      fileName: 'theme.css',
      source: readFileSync(resolve('lib/style/tokens.css'), 'utf-8').replace(
        "@import './brand.css';",
        readFileSync(resolve('lib/style/brand.css'), 'utf-8')
      ),
    });
  },
};

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
    // Browser build. `hydratable` keeps it compatible with the SSR build.
    solid({ solid: { hydratable: true } }),
    tailwindcss(),
    emitTheme,
    dts({
      tsconfigPath: './tsconfig.lib.json',
      entryRoot: 'lib',
    }),
  ],
});
