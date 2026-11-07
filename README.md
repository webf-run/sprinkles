# `@webf/sprinkles`

Solid.js components for websites and admin apps, styled with Tailwind CSS v4.
The design system is inspired by Adobe Spectrum 2: semantic tokens, one size
scale, every state designed, and accessibility built in. Interactive
components are built on [Ark UI](https://ark-ui.com).

```sh
npm install --save @webf/sprinkles
```

## Requirements

Components are published as uncompiled Solid JSX (`dist/index.jsx`, under the
`solid` export condition), so the same build works for client rendering, SSR
and hydration. Your bundler must compile Solid JSX from dependencies:
`vite-plugin-solid`, `@astrojs/solid-js` and SolidStart do this out of the box.

## Styles

With Tailwind v4 in your app, import the tokens after Tailwind; Sprinkles'
classes are found automatically:

```css
@import 'tailwindcss';
@import '@webf/sprinkles/theme.css';
```

Without Tailwind, import the precompiled `@webf/sprinkles/style.css`.

Re-skin everything by overriding token values in your own `:root`
(`--color-accent: …`); see `doc/design-tokens.md`.
