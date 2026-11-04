# Design tokens

`lib/theme.css` is the only source of design tokens for Sprinkles and for
every app that uses it (Foundation site included).

## Rules

1. Never use a component or feature name in a shared token
   (card, badge, tile, banner, button, notice, document, footer, ...).
2. One category prefix per kind of value: `--color-*`, `--text-*`,
   `--leading-*`, `--tracking-*`, `--radius-*`, `--shadow-*`,
   `--container-*`, `--font-*`, `--background-image-*`.
3. Scales: `xs sm md lg xl 2xl 3xl 4xl 5xl` for sizes (`fluid-` prefixed for
   text), hue + shade number for palettes (`purple-705`; roughly 0 = white,
   1000 = black).
4. Semantic names for roles, never for appearance or location:
   `primary`, `primary-hover`, `surface-muted`, `foreground-muted`,
   `border-subtle`. No `plum`, `lilac`, `mist`, `ink`, `brand`.
5. One value, one token. Check `theme.css` before adding anything.
6. Component-specific values stay in the component (arbitrary value or local
   CSS variable) and reference shared tokens where they can.
7. Apps override values of existing tokens; they do not add parallel names.

## Colour tiers

| Tier      | Pattern                | Example                  | Use                              |
| --------- | ---------------------- | ------------------------ | -------------------------------- |
| Primitive | `--color-<hue>-<shade>` | `--color-purple-705`     | Palette. Use directly for one-off tints and status colours. |
| Semantic  | `--color-<role>`        | `--color-primary`        | Components. Themeable per app.   |

A semantic colour works for text, border, fill and background alike:
`text-primary`, `border-primary`, `bg-primary`.

### Semantic roles

| Group      | Tokens (weakest to strongest)                                                               |
| ---------- | ------------------------------------------------------------------------------------------- |
| Primary    | `primary`, `primary-hover`, `primary-active`, `primary-foreground`, `primary-dark`, `primary-darker`, `primary-darkest` |
| Accent     | `accent`, `accent-hover`, `accent-active`, `accent-foreground`                              |
| Status     | `success`                                                                                   |
| Surface    | `surface`, `surface-muted`, `surface-tint`, `surface-soft`, `surface-emphasis`              |
| Foreground | `foreground-subtle`, `foreground-muted`, `foreground`, `foreground-strong`, `foreground-strongest`, `foreground-inverse` |
| Border     | `border-muted`, `border`, `border-subtle`, `border-accent`, `border-inverse`                |

Status and badge colours (green, orange, blue, pink, neutral) use palette
primitives directly, for example `bg-green-40 text-green-530`.

## Type, shape, layout

| Category        | Scale                                                                                  |
| --------------- | -------------------------------------------------------------------------------------- |
| `--text-fluid-*` | `xs sm md lg xl 2xl 3xl 4xl 5xl`, fluid between 375px and 1440px viewports. Each step bundles its line-height and letter-spacing. Tailwind's fixed `text-xs ... text-9xl` are kept. |
| `--leading-*`   | `110 115 120 126 143 145 150 160 165` (unitless ratio x 100)                           |
| `--tracking-*`  | `tight-8 tight-20 tight-30 wide-130 wide-140`                                          |
| `--radius-*`    | Tailwind's scale plus `10 15 20 30` (px) and `5xl`                                     |
| `--shadow-*`    | Tailwind's scale plus `offset-sm`, `offset-md`, `offset-lg`                            |
| `--container-*` | Tailwind's scale plus `8xl` (100rem) and `9xl` (120rem)                                |
| `--font-*`      | `heading`, `ui`                                                                        |

## Adding a token

1. Does an existing token already hold this value (or one within a few
   percent)? Use it.
2. Is it used by more than one component? If not, keep it in the component.
3. Name it by what it is (`--color-purple-150`) or the role it plays
   (`--color-border-subtle`), then add it to the right tier.
