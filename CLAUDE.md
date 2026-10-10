# Sprinkles

Solid.js component library styled with Tailwind CSS v4, plus an Astro
Starlight site that documents it.

- `lib/` — the library. Everything in here ships in the package.
- `site/` — the docs site. Nothing in here ships.
- `lib-legacy/` — old components, not built or published.

The site imports from `lib/`; nothing in `lib/` refers to `site/`.

## How the library is built

`pnpm build:lib` runs tsdown (see `tsdown.config.ts`) and writes `dist/`:

| Output            | What it is                                                   |
| ----------------- | ------------------------------------------------------------ |
| `dist/index.jsx`  | All components, TypeScript stripped, **JSX left uncompiled** |
| `dist/index.d.ts` | Bundled type declarations                                    |
| `dist/theme.css`  | Copy of `lib/theme.css`                                      |
| `dist/style.css`  | `lib/style.css` compiled by the Tailwind CLI                 |

The JSX is left uncompiled on purpose. Solid compiles differently for the
browser and the server, so the app using Sprinkles compiles it with its own
Solid setup (vite-plugin-solid, `@astrojs/solid-js`, SolidStart). One build
works for client rendering, SSR and hydration. Don't add a second build or a
Solid compiler plugin to tsdown.

## Stylesheets

```
lib/
  theme.css    design tokens: the single source of truth
  style.css    entry for the precompiled dist/style.css
site/style/
  custom.css   the docs site's stylesheet (Starlight + Tailwind)
  token.css    tokens used only by the docs site
```

### `lib/theme.css`: design tokens

- Plain CSS variables on `:root`, inside `@layer theme`, so an app's own
  unlayered `:root { --brand: … }` always overrides them.
- `@theme inline` maps those variables to Tailwind utility names
  (`--color-brand` → `bg-brand`, `text-brand`, …).
- `@theme` holds the type, spacing, radius and shadow scales.
- `@source '.'` points Tailwind at the components. It resolves to `lib/` in
  this repo and to `dist/` once published, so an app that imports
  `@webf/sprinkles/theme.css` needs no extra `@source` line.

Add new tokens here. Don't create another token file.

The palette has two generations: the older `--primary` / `--accent` set and
the newer `--brand` / `--highlight` / `--ink` set used by the marketing
components. Prefer the newer set for new work.

### `lib/style.css`: precompiled stylesheet

For apps that don't run Tailwind. It contains Tailwind's theme and utilities
with **no Preflight**, so it doesn't reset the app's global styles. Its
utilities import uses `source(none)`, which means only the library is scanned
and classes from the docs site never leak into the published CSS.

### `site/style/custom.css`: docs site

This follows Starlight's Tailwind recipe (`@astrojs/starlight-tailwind`):

- Layer order is `base < starlight < theme < components < utilities`, so
  Tailwind classes win over Starlight's styles.
- No Preflight globally, because it would strip Starlight's content styles
  such as list bullets and link styling.
- Imports `lib/theme.css` and `site/style/token.css`, and sets the site fonts
  through `--font-sans` / `--font-mono`, which Starlight reads.
- Starlight's styles are layered, so plain unlayered rules override them. You
  don't need `!important` or Astro's hashed class names (`.astro-xxxx`).
- Component previews get no extra reset, so they show components as an app
  without Preflight would see them.

### Components don't rely on Preflight

Apps may use `style.css` without any CSS reset, so components style their own
links and lists instead of relying on Preflight:

- Links: `no-underline`, plus `text-inherit` when the link sets no colour.
- Lists: `list-none p-0` on `<ul>` / `<ol>`.

## Watch mode

`pnpm dev:lib` runs `tsdown --watch` and rebuilds on component and
`lib/theme.css` changes. Restart it after editing `lib/style.css` itself.
