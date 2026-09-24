import { fileURLToPath } from 'node:url';

import solid from '@astrojs/solid-js';
import starlight from '@astrojs/starlight';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'astro/config';

export default defineConfig({
  srcDir: './site',
  publicDir: './public',
  outDir: './dist',

  integrations: [
    solid(),
    starlight({
      title: 'Sprinkles',
      social: [
        {
          icon: 'github',
          label: 'GitHub',
          href: 'https://github.com/webf-run/sprinkles',
        },
      ],
      components: {
        Header: './site/components/starlight/Header.astro',
      },

      customCss: ['./site/styles/custom.css'],
      sidebar: [
        {
          label: 'Getting Started',
          items: [
            {
              label: 'Installation',
              slug: 'getting-started/installation',
            },
          ],
        },
        {
          label: 'Components',
          items: [
            {
              label: 'Link',
              slug: 'components/link',
            },
            { label: 'Navbar', slug: 'components/navbar' },
            { label: 'Footer', slug: 'components/footer' },
            { label: 'Badge', slug: 'components/badge' },
          ],
        },
        {
          label: 'Cards',
          items: [
            { label: 'Feature Card', slug: 'cards/feature-card' },
            { label: 'Benefit Card', slug: 'cards/benefit-card' },
            { label: 'Testimonial Card', slug: 'cards/testimonial-card' },
            { label: 'Company Card', slug: 'cards/company-card' },
            { label: 'Stat Card', slug: 'cards/stat-card' },
            {
              label: 'Placement Stat Card',
              slug: 'cards/placement-stat-card',
            },
          ],
        },
      ],
    }),
  ],

  vite: {
    plugins: [tailwindcss()],
    ssr: {
      noExternal: ['lucide-astro'],
    },
    resolve: {
      alias: {
        '@webf-run/sprinkles': fileURLToPath(
          new URL('./lib/index.ts', import.meta.url)
        ),
      },
    },
    optimizeDeps: {
      exclude: ['@astrojs/compiler'],
    },
  },
});
