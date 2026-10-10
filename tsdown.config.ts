import { defineConfig } from 'tsdown';

/**
 * A single build for every environment. TypeScript is stripped but JSX is
 * preserved (`jsx: preserve` in tsconfig.lib.json), so the consuming app's
 * Solid compiler produces DOM, SSR or hydratable output as it needs.
 */
export default defineConfig({
  entry: { index: 'lib/index.ts' },
  platform: 'neutral',
  tsconfig: 'tsconfig.lib.json',
  dts: true,
  outExtensions: () => ({ js: '.jsx' }),

  // Design tokens as Tailwind source, for apps that run Tailwind v4.
  copy: 'lib/theme.css',

  // Pre-compiled utilities for apps that don't run Tailwind.
  onSuccess: 'tailwindcss -i lib/style.css -o dist/style.css --minify',
});
