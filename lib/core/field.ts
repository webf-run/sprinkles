import { FocusRing, type Size, Transition } from './control';

/**
 * The look every text-like input shares: TextField, TextArea, NumberInput,
 * Combobox, DatePicker and Select's trigger. Borders are `border-strong` so
 * the control's outline reaches 3:1 against the page.
 */
export const InputBase = [
  'box-border m-0 w-full min-w-0 border border-border-strong bg-surface font-inherit text-foreground-strong',
  'placeholder:text-foreground-subtle',
  'hover:border-foreground-muted',
  'data-invalid:border-negative aria-invalid:border-negative',
  'disabled:cursor-not-allowed disabled:border-border disabled:bg-neutral-subtle disabled:text-foreground-subtle',
  'read-only:border-border read-only:bg-surface-muted',
  FocusRing,
  Transition,
].join(' ');

/** Height, padding, text and radius of an input at each size. */
export const InputSize: Record<Size, string> = {
  s: 'h-6 rounded-md px-2 text-xs',
  m: 'h-8 rounded-lg px-3 text-sm',
  l: 'h-10 rounded-lg px-3 text-base',
  xl: 'h-12 rounded-xl px-4 text-lg',
};

/** Room for a leading icon, at each size. */
export const InputIconPadding: Record<Size, string> = {
  s: 'pl-6',
  m: 'pl-8',
  l: 'pl-10',
  xl: 'pl-12',
};

/** Where the leading icon sits, at each size. */
export const InputIconPosition: Record<Size, string> = {
  s: 'left-2 size-3',
  m: 'left-3 size-4',
  l: 'left-3 size-5',
  xl: 'left-4 size-6',
};

export const LabelText =
  'text-sm font-medium text-foreground-strong data-disabled:text-foreground-subtle';
export const HelperText = 'text-xs text-foreground-muted';
export const ErrorText =
  'flex items-start gap-1 text-xs leading-4 font-medium text-negative';
