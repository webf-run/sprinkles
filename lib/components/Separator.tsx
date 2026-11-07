import { cva } from 'class-variance-authority';

import { cn } from '../utils';

export type SeparatorSize = 's' | 'm' | 'l';

/** The line is a border, so 1, 2 and 4 px stay on the scale (`border`, `border-2`, `border-4`). */
const separator = cva('m-0 box-border shrink-0 p-0', {
  variants: {
    orientation: {
      horizontal: 'h-0 w-full',
      // Stretches to the height of the flex row it sits in.
      vertical: 'w-0 self-stretch',
    },
    // Spectrum's divider: 1 and 2 px quiet lines, and a 4 px strong one for major breaks.
    size: {
      s: 'border-border-muted',
      m: 'border-border-muted',
      l: 'border-foreground-strong',
    },
  },
  compoundVariants: [
    { orientation: 'horizontal', size: 's', class: 'border-t' },
    { orientation: 'horizontal', size: 'm', class: 'border-t-2' },
    { orientation: 'horizontal', size: 'l', class: 'border-t-4' },
    { orientation: 'vertical', size: 's', class: 'border-l' },
    { orientation: 'vertical', size: 'm', class: 'border-l-2' },
    { orientation: 'vertical', size: 'l', class: 'border-l-4' },
  ],
  defaultVariants: { orientation: 'horizontal', size: 's' },
});

export interface SeparatorProps {
  orientation?: 'horizontal' | 'vertical';
  /** `s` (1 px) for most breaks, `m` (2 px) between groups, `l` (4 px) under a page or section title. */
  size?: SeparatorSize;
  /** A purely visual line, hidden from screen readers. Use it when the line only echoes a break that headings or layout already make. */
  decorative?: boolean;
  class?: string;
}

/**
 * A line between content. It is announced as a separator unless
 * `decorative`. A vertical separator goes in a flex row and takes its height.
 */
export function Separator(props: SeparatorProps) {
  const orientation = () => props.orientation ?? 'horizontal';

  return (
    <div
      role={props.decorative ? 'none' : 'separator'}
      // `separator` defaults to horizontal; only vertical needs saying.
      aria-orientation={
        !props.decorative && orientation() === 'vertical'
          ? 'vertical'
          : undefined
      }
      class={cn(
        separator({ orientation: orientation(), size: props.size ?? 's' }),
        props.class
      )}
    />
  );
}
