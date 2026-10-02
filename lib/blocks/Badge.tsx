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
        /** Solid orange (#FFA037) with dark text. */
        highlight: 'bg-highlight text-highlight-foreground',
        /** White pill with brand-coloured text. */
        light: 'bg-white text-brand',
        /** Translucent pill for use on photos / dark backgrounds. */
        glass:
          'gap-2 border border-white/25 bg-white/29 text-white backdrop-blur-sm',
        /** Rounded-rectangle outlined tag. */
        tag: 'rounded-badge-tag border border-badge-purple-foreground bg-badge-purple-background font-medium text-badge-purple-foreground',
      },

      size: {
        sm: 'px-3 py-1.5 text-xs',
        md: 'px-4 py-2 text-sm',
        lg: 'px-5 py-2.5 text-base',
        /** Large, responsive section label ("OUR PROGRAMS", "QUICK ACCESS"). */
        section: [
          'h-badge-md-mobile-height w-badge-md-mobile-width rounded-badge-md-mobile',
          'px-badge-md-mobile-x py-badge-md-mobile-y',
          'font-badge text-badge-md-mobile leading-120 tracking-wide-130 text-center',
          'md:h-badge-md-height md:w-auto md:rounded-badge-md',
          'md:px-badge-md-x md:py-badge-md-y md:text-badge-md',
        ],
        /** Small eyebrow tag used inside cards. */
        tag: 'px-3 py-1.5 text-eyebrow leading-120 tracking-wide-140 md:px-4 md:py-2',
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
