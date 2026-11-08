# Sprinkles

Solid.js component library styled with Tailwind CSS v4, plus an Astro
Starlight site that documents it. The design system is inspired by Adobe
Spectrum 2; the token rules are in `doc/design-tokens.md`.

- `lib/` — the library. Everything in here ships in the package.
  - `core/` — shared conventions: the size scale, focus ring and motion
    (`control.ts`), input styles (`field.ts`), tones (`tone.ts`), the
    marketing cards' look (`card.ts`), popovers and lists (`popover.ts`).
  - `components/` — app controls; interactive ones are built on Ark UI.
  - `blocks/` — marketing sections and cards for websites.
  - `icons/` — brand marks only. Every other icon comes from `lucide-solid`,
    imported one by one (`lucide-solid/icons/arrow-right`).
- `site/` — the docs site. Nothing in here ships.

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

- `@theme static` emits every token as a CSS variable on `:root` inside
  `@layer theme`, so an app's own unlayered `:root { --color-accent: … }`
  always overrides it.
- Each `--color-*` token becomes Tailwind utilities (`--color-accent` →
  `bg-accent`, `text-accent`, …).
- `@theme` holds the type, spacing, radius and shadow scales.
- `@source '.'` points Tailwind at the components. It resolves to `lib/` in
  this repo and to `dist/` once published, so an app that imports
  `@webf/sprinkles/theme.css` needs no extra `@source` line.

Add new tokens here. Don't create another token file. Components use
semantic and categorical tokens only, never palette primitives, and stay on
the scale: `pnpm lint` and `pnpm check:tokens` enforce both.

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

## Component rules

- Solid 1.9 and Ark UI v5. SSR-safe: no `window`, `document` or
  `localStorage` during render or at module top level; no module-level state.
- **Read JSX props once.** Solid's server `Show` reads `when` again, so a
  prop holding JSX that is read in `when` and in the body is created twice
  and breaks hydration. Resolve it first: `const label = children(() =>
props.label)`.
- **Light and dark:** colour tokens are `light-dark(<light>, <dark>)` and
  follow `color-scheme` (light unless the app opts in). Components never use
  `dark:` variants; a new colour token needs both values, and
  `pnpm check:tokens` checks contrast in both schemes.
- Overlays animate with the `animate-*-in/-out` keyframe tokens under
  `motion-safe:`; Ark waits for an animation, not a transition, before it
  unmounts closing content.
- `pnpm lint`, `pnpm check:tokens`, `pnpm exec astro check` and Prettier must
  pass; every component has a docs page (anatomy, options, states,
  accessibility, do and don't, props).
