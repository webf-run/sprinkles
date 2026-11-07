import { type VariantProps, cva } from 'class-variance-authority';

import type { Size, StaticColor } from '../core/control';
import { cn } from '../utils';

const spinner = cva('inline-block shrink-0 motion-safe:animate-spin', {
  variants: {
    size: {
      s: 'size-4',
      m: 'size-6',
      l: 'size-8',
      xl: 'size-12',
    },
    tone: {
      accent: 'text-accent',
      current: 'text-current',
      white: 'text-white',
      black: 'text-black',
    },
  },
  defaultVariants: { size: 'm', tone: 'accent' },
});

export interface SpinnerProps extends Pick<
  VariantProps<typeof spinner>,
  'size'
> {
  size?: Size;
  /** What the spinner is waiting for, read by screen readers. */
  label?: string;
  /** `current` follows the text colour, e.g. inside a button. */
  tone?: 'accent' | 'current';
  staticColor?: StaticColor;
  class?: string;
}

/**
 * An indeterminate progress circle. Announced as a progress bar with a label;
 * with reduced motion it stays still (the arc still reads as "loading").
 */
export function Spinner(props: SpinnerProps) {
  return (
    <svg
      role='progressbar'
      aria-label={props.label ?? 'Loading'}
      viewBox='0 0 24 24'
      fill='none'
      class={cn(
        spinner({ size: props.size, tone: props.staticColor ?? props.tone }),
        props.class
      )}
    >
      <circle
        cx='12'
        cy='12'
        r='9'
        stroke='currentColor'
        stroke-opacity='0.2'
        stroke-width='3'
      />
      <path
        d='M21 12a9 9 0 0 0-9-9'
        stroke='currentColor'
        stroke-width='3'
        stroke-linecap='round'
      />
    </svg>
  );
}
