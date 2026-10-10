# `@webf/sprinkles`

Solid.js component library implementing Adobe Spectrum Design System.

```sh
npm install --save @webf/sprinkles
```

## Requirements

Components are published as uncompiled Solid JSX (`dist/index.jsx`, under the
`solid` export condition), so the same build works for client rendering, SSR
and hydration. Your bundler must compile Solid JSX from dependencies:
`vite-plugin-solid`, `@astrojs/solid-js` and SolidStart do this out of the box.
