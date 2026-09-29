import { type VariantProps, cva } from 'class-variance-authority';
import type { JSX } from 'solid-js';

import { cn } from '../utils';

const badgeVariants = cva(
  'inline-flex items-center justify-center rounded-full font-semibold leading-normal tracking-widest',
  {
    variants: {
      variant: {
        purple: 'bg-badge-purple-background text-badge-purple-foreground',
        orange: 'bg-badge-orange-background text-badge-orange-foreground',
        green: 'bg-badge-green-background text-badge-green-foreground',
        blue: 'bg-badge-blue-background text-badge-blue-foreground',
        neutral: 'bg-badge-neutral-background text-badge-neutral-foreground',
        pink: 'bg-badge-pink-background text-badge-pink-foreground',
      },

      size: {
        sm: 'px-3 py-1.5 text-xs',
        md: 'px-4 py-2 text-sm',
        lg: 'px-5 py-2.5 text-base',
      },
    },

    defaultVariants: {
      variant: 'purple',
      size: 'md',
    },
  }
);

interface BadgeProps extends VariantProps<typeof badgeVariants> {
  class?: string;
  children?: JSX.Element;
}

export function Badge(props: BadgeProps) {
  return (
    <span
      class={cn(
        badgeVariants({ variant: props.variant, size: props.size }),
        props.class
      )}
    >
      {props.children}
    </span>
  );
}
