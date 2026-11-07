import { defineConfig } from 'tsdown';

/**
 * A single build for every environment. TypeScript is stripped but JSX is
 * preserved (`jsx: preserve` in tsconfig.lib.json), so the consuming app's
 * Solid compiler produces DOM, SSR or hydratable output as it needs.
 *
 * `unbundle` keeps one output file per source module (dist/components/Button.jsx,
 * …), published as subpaths (`@webf/sprinkles/components/Button`). An Astro
 * island hydrated from a subpath ships that component alone; one hydrated
 * from the package root would ship the whole package, because Astro imports
 * an island's module as a namespace.
 */
export default defineConfig({
  entry: { index: 'lib/index.ts' },
  root: 'lib',
  unbundle: true,
  platform: 'neutral',
  tsconfig: 'tsconfig.lib.json',
  dts: true,
  outExtensions: () => ({ js: '.jsx', dts: '.d.ts' }),

  // Design tokens as Tailwind source, for apps that run Tailwind v4.
  copy: 'lib/theme.css',

  // Pre-compiled utilities for apps that don't run Tailwind.
  onSuccess: 'tailwindcss -i lib/style.css -o dist/style.css --minify',
});
