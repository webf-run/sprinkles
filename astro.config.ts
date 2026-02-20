// @ts-check
import path from 'node:path';

import node from '@astrojs/node';
import solidJs from '@astrojs/solid-js';
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  output: 'server',
  adapter: node({
    mode: 'standalone',
  }),

  integrations: [solidJs()],

  // Vite configuration for better performance
  vite: {
    resolve: {
      alias: {
        // Force lucide-solid to use pre-compiled JS instead of JSX
        'lucide-solid': path.join(
          process.cwd(),
          'node_modules/lucide-solid/dist/esm/lucide-solid.js'
        ),
      },
    },
    // Optimize dependency pre-bundling
    optimizeDeps: {
      include: ['lucide-solid'],
      // Force pre-bundling of lucide-solid to avoid JSX compilation
      force: true,
    },
  },
});
