import { type Size, Transition } from './control';

/**
 * Everything that floats from a trigger shares these: Select, Combobox,
 * DatePicker, DropdownMenu, Popover.
 */

/**
 * Pops in from the trigger (`origin-anchor` reads the transform origin Ark
 * computes) and out again; Ark keeps the content mounted until the `-out`
 * animation ends. Still where the user asks for less motion.
 */
export const PopMotion =
  'origin-anchor motion-safe:state-open:animate-pop-in motion-safe:state-closed:animate-pop-out';

/** The floating surface: a list, a calendar, a menu or a panel. */
export const PopoverSurface = [
  'z-50 box-border rounded-lg border border-border-muted bg-surface text-foreground-strong shadow-overlay outline-none',
  PopMotion,
].join(' ');

/**
 * The scrolling list inside the surface. Ark focuses it while the arrow keys
 * move the highlight, which already shows where focus is, so it has no ring.
 */
export const ListBox =
  'm-0 box-border flex max-h-72 list-none flex-col gap-px overflow-y-auto p-1 outline-none';

/** An option: highlighted by pointer or arrow keys, pressed while held. */
export const ListItem = [
  'relative flex cursor-pointer items-center gap-2 rounded-md text-foreground-strong outline-none select-none',
  'data-highlighted:bg-neutral-subtle data-highlighted:active:bg-neutral/12',
  'data-disabled:cursor-not-allowed data-disabled:text-foreground-subtle',
  Transition,
].join(' ');

/** Options follow the field's size, so a dense field gets a dense list. */
export const ListItemSize: Record<Size, string> = {
  s: 'min-h-6 px-2 py-1 text-xs',
  m: 'min-h-8 px-2 py-1 text-sm',
  l: 'min-h-10 px-3 py-2 text-base',
  xl: 'min-h-12 px-3 py-2 text-lg',
};

/** Shown in place of the options when there are none. */
export const ListEmpty: Record<Size, string> = {
  s: 'px-2 py-1 text-xs text-foreground-muted',
  m: 'px-2 py-2 text-sm text-foreground-muted',
  l: 'px-3 py-2 text-base text-foreground-muted',
  xl: 'px-3 py-3 text-lg text-foreground-muted',
};
