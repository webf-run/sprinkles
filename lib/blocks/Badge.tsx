import { type VariantProps, cva } from 'class-variance-authority';
import type { JSX } from 'solid-js';

import { cn } from '../utils';

const badgeVariants = cva(
  'inline-flex items-center justify-center rounded-full font-semibold leading-normal tracking-widest',
  {
    variants: {
      variant: {
        purple: 'bg-surface-soft text-primary',
        orange: 'bg-orange-55 text-orange-540',
        green: 'bg-green-40 text-green-530',
        blue: 'bg-blue-80 text-blue-610',
        neutral: 'bg-neutral-40 text-neutral-650',
        pink: 'bg-pink-65 text-pink-505',
        /** Soft pills with the brand-purple label, used for document categories. */
        'soft-purple': 'bg-purple-55 text-primary-dark',
        'soft-blue': 'bg-blue-45 text-primary-dark',
        'soft-green': 'bg-green-45 text-primary-dark',
        'soft-orange': 'bg-orange-40 text-primary-dark',
        /** Quiet slate-on-mist tag shown beside each document. */
        'soft-neutral': 'bg-purple-20 text-neutral-605',
        /** Solid orange (#FFA037) with dark text. */
        highlight: 'bg-accent text-accent-foreground',
        /** White pill with brand-coloured text. */
        light: 'bg-white text-primary',
        /** Translucent pill for use on photos / dark backgrounds. */
        glass:
          'gap-2 border border-white/25 bg-white/29 text-white backdrop-blur-sm',
        /** Rounded-rectangle outlined tag. */
        tag: 'rounded-15 border border-primary bg-surface-soft font-medium text-primary',
      },

      size: {
        sm: 'px-3 py-1.5 text-xs',
        md: 'px-4 py-2 text-sm',
        lg: 'px-5 py-2.5 text-base',
        /** Large, responsive section label ("OUR PROGRAMS", "QUICK ACCESS"). */
        section: [
          'h-7 w-auto rounded-full',
          'px-3 py-0',
          'font-ui text-(length:--text-fluid-xs) leading-120 tracking-wide-130 text-center',
          'md:h-7 md:w-auto md:rounded-full',
          'md:px-3 md:py-0 md:text-(length:--text-fluid-xs) md:leading-[1]',
        ],
        /** Small eyebrow tag used inside cards. */
        tag: 'px-3 py-1.5 text-fluid-xs leading-120 tracking-wide-140 md:px-4 md:py-2',
        /** Fixed-height 28px label: 11px bold, no tracking. Width is set by the caller. */
        label: 'h-7 px-3 text-[11px]/[1] font-bold leading-none tracking-normal',
        /** Announcement pill: 16px / 13% tracking, 172x35 box with the border inside. */
        notice:
          'px-3.75 py-2 text-xs leading-120 tracking-wide-130 xl:py-1.75 xl:text-[16px]/[1.2]',
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
