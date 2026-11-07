# Design tokens

`lib/theme.css` is the only source of design tokens for Sprinkles and for
every app that uses it. The design follows **Adobe Spectrum 2's principles,
not its look**: a small set of tokens, semantic names, one size scale, every
state designed, and accessibility built in.

## Rules

1. **Components use semantic and categorical tokens only, never palette
   primitives.** A site re-skins everything by overriding the _values_ of
   semantic tokens in its own `:root` (or on any element, for a subtree). It
   never adds parallel names.
2. Never use a component or feature name in a token (card, badge, tile,
   banner, button, document, footer, …). `pnpm check:tokens` enforces it.
3. One category prefix per kind of value: `--color-*`, `--text-*`,
   `--leading-*`, `--tracking-*`, `--radius-*`, `--shadow-*`, `--ease-*`,
   `--animate-*`, `--container-*`, `--font-*`, `--background-image-*`.
4. Semantic names describe a role, never an appearance or a place: `accent`,
   `surface-muted`, `foreground-subtle`. No `plum`, `lilac`, `ink`, `brand`.
5. One value, one token. Check `theme.css` before adding anything.
6. A palette primitive may not reuse one of Tailwind's own colour names
   (`red-600` would silently restyle an app's `bg-red-600`); `check:tokens`
   enforces it.
7. **Stay on the scale.** No arbitrary values (`text-[15px]`), no variable
   shorthands (`w-(--x)`), no fractional spacing (`gap-2.5`: the grid is
   4 px), no palette primitives in components. `pnpm lint` enforces all of
   it in `lib/` (`eslint.config.mjs`).

## Colour

| Tier        | Pattern                   | Example              | Use                                              |
| ----------- | ------------------------- | -------------------- | ------------------------------------------------ |
| Primitive   | `--color-<hue>-<shade>`   | `--color-purple-705` | The palette. Only tokens reference it.           |
| Semantic    | `--color-<role>[-<step>]` | `--color-accent`     | Components. Every site sets its own values.      |
| Categorical | `--color-<name>[-<step>]` | `--color-seafoam`    | Labels that carry no meaning (categories, tags). |

The shade of a primitive is `1000 − 10 × L*` (CIELAB lightness): 0 is white,
1000 is black.

### Semantic roles

Named as in Spectrum. Each role has the same steps:

| Step                       | Use                                    |
| -------------------------- | -------------------------------------- |
| `<role>`                   | Bold fill; text and icons on a surface |
| `<role>-hover`, `-down`    | The bold fill, hovered and pressed     |
| `<role>-foreground`        | Text and icons on the bold fill        |
| `<role>-subtle`            | Quiet fill                             |
| `<role>-subtle-foreground` | Text and icons on the quiet fill       |

| Role          | Meaning                                                                                                                                             |
| ------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| `accent`      | The call to action and the product's identity                                                                                                       |
| `neutral`     | Emphasis without colour (primary buttons, quiet controls)                                                                                           |
| `informative` | Help and neutral status                                                                                                                             |
| `positive`    | Success and approval                                                                                                                                |
| `notice`      | Caution: things that need attention soon                                                                                                            |
| `negative`    | Errors and destructive actions                                                                                                                      |
| `highlight`   | A design's second emphasis colour, Sprinkles' one addition to Spectrum's roles: a fill, or text on `surface-inverse`; never text on a light surface |

### Surfaces, foregrounds, borders

| Group      | Tokens                                                                                                                     |
| ---------- | -------------------------------------------------------------------------------------------------------------------------- |
| Surface    | `surface`, `surface-muted`, `surface-tint`, `surface-soft`, `surface-emphasis`, `surface-inverse` (dark bands)             |
| Foreground | `foreground-strongest`, `foreground-strong`, `foreground`, `foreground-muted`, `foreground-subtle`, `foreground-inverse`   |
| Border     | `border-strong` (form-control outlines, 3:1), `border`, `border-muted`, `border-subtle`, `border-accent`, `border-inverse` |
| Focus      | `focus-ring`: one ring for every control, on `:focus-visible` only                                                         |
| Backdrop   | `backdrop`: dims the page behind a modal dialog or drawer                                                                  |

### Categorical colours

`seafoam`, `indigo`, `purple`, `fuchsia`, `yellow`, each with `-foreground`,
`-subtle` and `-subtle-foreground`. Use them when colour only tells things
apart; use a role when colour means something.

`lib/core/tone.ts` maps every role, `highlight` and categorical colour (a
**tone**) to its classes, so Badge, the marketing cards and alerts share one
vocabulary: `variant` picks the tone, `fillStyle` (`bold | subtle | outline`)
how strongly it shows.

### Contrast

`pnpm check:tokens` checks WCAG 2.2 AA for every text and background pair the
roles define (4.5:1), and 3:1 for control borders and the focus ring, in the
default theme and in each `--theme` file (the docs' second theme,
`site/style/themes/studio.css`).

## Controls

One size scale for every control (`lib/core/control.ts`):

| Size | Height | Text        | Icon  | Radius       |
| ---- | ------ | ----------- | ----- | ------------ |
| `s`  | 24 px  | `text-xs`   | 12 px | `rounded-md` |
| `m`  | 32 px  | `text-sm`   | 16 px | `rounded-lg` |
| `l`  | 40 px  | `text-base` | 20 px | `rounded-lg` |
| `xl` | 48 px  | `text-lg`   | 24 px | `rounded-xl` |

Labels (Badge) sit half a step below: 20, 24, 28 and 32 px. The same props
everywhere: `variant` (semantic names), `size`, `fillStyle`, and
`staticColor` (`white | black`) over photos.

## Type, shape, motion, layout

| Category         | Scale                                                                                                                                                                               |
| ---------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `--text-fluid-*` | `xs sm md lg xl 2xl 3xl 4xl 5xl`, fluid between 375 px and 1440 px viewports. Each step carries its line-height and letter-spacing. Tailwind's fixed `text-xs … text-9xl` are kept. |
| `--leading-*`    | `110 115 120 126 143 145 150 160 165` (unitless ratio × 100)                                                                                                                        |
| `--tracking-*`   | `tight-8 tight-20 tight-30 wide-130 wide-140`                                                                                                                                       |
| `--radius-*`     | Tailwind's scale. The px steps `10 15 20 30` and `5xl` are deprecated: kept in 0.3 for existing sites, unused by components, removed in 0.4.                                        |
| `--shadow-*`     | `elevated` (lifts a card), `overlay` (popovers, menus, dialogs)                                                                                                                     |
| `--ease-*`       | `standard`, `emphasized`; durations are Tailwind's `duration-100/200/300`. Animate through `motion-safe:` so reduced motion turns it off.                                           |
| `--container-*`  | Tailwind's scale plus `8xl` (100 rem) and `9xl` (120 rem)                                                                                                                           |
| `--font-*`       | `heading`, `ui`                                                                                                                                                                     |

## Adding a token

1. Does an existing token already hold this value (or one within a few
   percent)? Use it.
2. Is it used by more than one component? If not, it is a sign the design
   should use the scale.
3. Name it by the role it plays (`--color-border-subtle`), or as a palette
   primitive (`--color-purple-150`) that only other tokens reference.
4. Run `pnpm check:tokens` and `pnpm lint`.
