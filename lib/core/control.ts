/**
 * The conventions every control shares (doc/design-tokens.md, "Controls").
 * Components build their variants from these, so sizes, focus and motion
 * stay identical across Button, fields, menus and badges.
 */

/** One size scale for every control: 24, 32, 40 and 48 px tall. */
export type Size = 's' | 'm' | 'l' | 'xl';

/** Semantic roles a component can take as `variant`. */
export type Role =
  'accent' | 'neutral' | 'informative' | 'positive' | 'notice' | 'negative';

/** Colours for labels that carry no meaning. */
export type Categorical =
  'seafoam' | 'indigo' | 'purple' | 'fuchsia' | 'yellow';

/** How strongly a colour is applied. */
export type FillStyle = 'bold' | 'subtle' | 'outline';

/** For controls placed over photos or colour: ignore the theme, use white or black. */
export type StaticColor = 'white' | 'black';

/** Height of a control at each size. */
export const ControlHeight: Record<Size, string> = {
  s: 'h-6',
  m: 'h-8',
  l: 'h-10',
  xl: 'h-12',
};

/** Minimum width, so icon-only and short controls stay square. */
export const ControlMinWidth: Record<Size, string> = {
  s: 'min-w-6',
  m: 'min-w-8',
  l: 'min-w-10',
  xl: 'min-w-12',
};

/** Text size of a control's label and value. */
export const ControlText: Record<Size, string> = {
  s: 'text-xs',
  m: 'text-sm',
  l: 'text-base',
  xl: 'text-lg',
};

/** Inline padding of a control with a text label. */
export const ControlPadding: Record<Size, string> = {
  s: 'px-2',
  m: 'px-3',
  l: 'px-4',
  xl: 'px-5',
};

/** Gap between an icon and a label. */
export const ControlGap: Record<Size, string> = {
  s: 'gap-1',
  m: 'gap-2',
  l: 'gap-2',
  xl: 'gap-2',
};

/** Corner radius: the larger the control, the rounder. */
export const ControlRadius: Record<Size, string> = {
  s: 'rounded-md',
  m: 'rounded-lg',
  l: 'rounded-lg',
  xl: 'rounded-xl',
};

/** Icon size inside a control, as a Tailwind size class. */
export const IconSize: Record<Size, string> = {
  s: 'size-3',
  m: 'size-4',
  l: 'size-5',
  xl: 'size-6',
};

/**
 * The one focus ring: keyboard focus only, never on click. `outline-solid`
 * is required: `outline-none` sets the outline style to none, and
 * `outline-2` alone only sets the width.
 */
export const FocusRing =
  'outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-solid focus-visible:outline-focus-ring';

/** The same ring, for a control whose focus lands on an inner element. */
export const FocusWithinRing =
  'has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-solid has-focus-visible:outline-focus-ring';

/**
 * Resets every control needs when the app has no Preflight: border-box
 * sizing (so a 32 px control is 32 px with its border) and the page's font.
 */
export const ControlReset = 'box-border m-0 font-inherit';

/** Colour transitions for interactive states; nothing moves when the user asks for less motion. */
export const Transition =
  'motion-safe:transition-colors motion-safe:duration-100 motion-safe:ease-standard';

/** Disabled controls: not focusable by pointer, visibly inactive. */
export const Disabled =
  'disabled:cursor-not-allowed aria-disabled:cursor-not-allowed';
