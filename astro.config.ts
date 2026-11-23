import { fileURLToPath } from 'node:url';

import solid from '@astrojs/solid-js';
import starlight from '@astrojs/starlight';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'astro/config';
import starlightSidebarTopics from 'starlight-sidebar-topics';

import { Links } from './site/data/Constant';

export default defineConfig({
  srcDir: './site',
  publicDir: './public',
  outDir: './dist-site',

  // SEO
  site: 'https://sprinkles.webf.run',
  trailingSlash: 'never',

  integrations: [
    solid(),
    starlight({
      title: 'Sprinkles',
      social: [
        {
          icon: 'github',
          label: 'GitHub',
          href: Links.repo,
        },
      ],
      components: {
        Header: './site/components/starlight/Header.astro',
        Sidebar: './site/components/starlight/Sidebar.astro',
      },

      customCss: ['./site/style/custom.css'],
      plugins: [
        // Each topic is a header section with its own sidebar. A topic's
        // `link` page gets that sidebar even when it isn't listed in it.
        starlightSidebarTopics([
          {
            label: 'Guide',
            link: Links.gettingStarted,
            items: [
              {
                label: 'Getting Started',
                items: [
                  {
                    label: 'Installation',
                    slug: 'getting-started/installation',
                  },
                  { label: 'Astro', slug: 'getting-started/astro' },
                  { label: 'SolidStart', slug: 'getting-started/solid-start' },
                  { label: 'Vite + Solid.js', slug: 'getting-started/vite' },
                  {
                    label: 'Styling and theming',
                    slug: 'getting-started/styling',
                  },
                ],
              },
              {
                label: 'Advanced',
                items: [{ autogenerate: { directory: 'advanced' } }],
              },
            ],
          },
          {
            label: 'Components',
            link: Links.components,
            // One group per kind of component, in the order Spectrum lists
            // them. Each lists its folder, so a new page needs no change here.
            items: [
              {
                label: 'Actions',
                items: [{ autogenerate: { directory: 'actions' } }],
              },
              {
                label: 'Navigation',
                items: [{ autogenerate: { directory: 'navigation' } }],
              },
              {
                label: 'Fields',
                items: [{ autogenerate: { directory: 'fields' } }],
              },
              {
                label: 'Overlays',
                items: [{ autogenerate: { directory: 'overlays' } }],
              },
              {
                label: 'Feedback',
                items: [{ autogenerate: { directory: 'feedback' } }],
              },
              {
                label: 'Layout',
                items: [{ autogenerate: { directory: 'layout' } }],
              },
              {
                label: 'Data display',
                items: [{ autogenerate: { directory: 'data-display' } }],
              },
            ],
          },
          {
            label: 'Blocks',
            link: Links.blocks,
            items: [
              {
                label: 'Blocks',
                items: [{ autogenerate: { directory: 'blocks' } }],
              },
              {
                label: 'Cards',
                items: [{ autogenerate: { directory: 'cards' } }],
              },
            ],
          },
        ]),
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
        '@webf/sprinkles': fileURLToPath(
          new URL('./lib/index.ts', import.meta.url)
        ),
      },
    },
    build: {
      rolldownOptions: {
        onLog(level, log, defaultHandler) {
          if (
            log.code === 'MODULE_LEVEL_DIRECTIVE' &&
            log.message?.includes('astro:head-inject')
          ) {
            return;
          }
          defaultHandler(level, log);
        },
      },
    },
  },
});
