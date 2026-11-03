import { type VariantProps, cva } from 'class-variance-authority';
import { ArrowRight } from 'lucide-solid';
import type { JSX } from 'solid-js';
import { Dynamic } from 'solid-js/web';

import type { IconComponent } from '../types';
import { cn } from '../utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 rounded-lg border font-semibold no-underline transition-all duration-300 focus:outline-none focus:ring-2',
  {
    variants: {
      variant: {
        primary: 'border-transparent bg-primary text-primary-foreground',
        secondary:
          'border-purple-135 bg-surface text-primary-active',
        success: 'border-border-inverse bg-success text-foreground-inverse',
        purple:
          'rounded-md border-purple-135 bg-accent text-sm text-accent-foreground',
        blackwhite:
          'border-purple-70 bg-surface text-sm text-neutral-520',
        /** Solid orange call-to-action. */
        highlight:
          'border-0 bg-accent text-accent-foreground hover:bg-accent-hover active:bg-accent-active',
        /** Solid orange call-to-action with deep-purple text, for dark backgrounds. */
        'highlight-deep':
          'border-0 bg-accent text-primary-darkest hover:bg-accent-hover active:bg-accent-active',
        /** Brand-coloured outline. */
        outline:
          'border-primary bg-transparent text-primary hover:bg-surface-muted active:bg-surface-soft',
        /** White outline for dark / photo backgrounds. */
        inverse:
          'border-white bg-transparent text-white hover:bg-white/15 active:bg-white/25',
        /** Deep-purple solid button. */
        dark: 'border-0 bg-primary-darkest text-white hover:bg-primary-darker',
        /** Plum solid button (announcements). */
        plum: 'border-0 bg-purple-785 text-white hover:bg-purple-785/90 active:bg-purple-785/80',
        /** Solid brand-purple button (programme pages). */
        brand:
          'border-transparent bg-primary text-white hover:bg-primary-dark active:bg-primary-darkest',
        /** Solid deep-brand (#4e13a6) button, e.g. the documents help banner. */
        'brand-deep':
          'border-transparent bg-primary-dark text-white hover:bg-primary-darkest active:bg-primary-darkest',
        /** Soft-bordered brand outline (secondary action next to `brand`). */
        'brand-outline':
          'border-2 border-purple-230 bg-transparent text-primary hover:bg-surface-muted active:bg-surface-tint',
      },
      size: {
        sm: 'px-4 py-2 text-sm',
        md: 'px-6 py-3 text-sm',
        lg: 'px-8 py-4 text-lg',
        /** Marketing button, 48px tall (56px from md). */
        action:
          'h-12 cursor-pointer gap-1 duration-200 ease-out px-5 text-lg leading-165 whitespace-nowrap hover:-translate-y-px active:translate-y-0 focus:ring-0 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 md:h-14 md:gap-2 md:px-6',
        /** Announcement button: 16/8 padding, 18px semibold, 10px icon gap. */
        notice:
          'gap-2.5 px-4 py-2 text-sm leading-120 tracking-tight-30 whitespace-nowrap xl:text-[18px]/[1.2]',
        /** Large marketing button. */
        'action-lg':
          'cursor-pointer gap-1 duration-200 ease-out px-6 py-4 text-fluid-md leading-165 whitespace-nowrap hover:-translate-y-px active:translate-y-0 focus:ring-0 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 md:gap-2 md:px-7 xl:rounded-xl',
      },
      disabled: {
        true: 'pointer-events-none cursor-not-allowed opacity-50',
        false: '',
      },
    },
    defaultVariants: { variant: 'primary', size: 'md', disabled: false },
  }
);
interface LinkProps extends VariantProps<typeof buttonVariants> {
  href?: string;
  disabled?: boolean;
  loading?: boolean;
  type?: 'button' | 'submit' | 'reset';
  class?: string;
  style?: string;
  target?: string;
  rel?: string;
  showIcon?: boolean;
  icon?: IconComponent;
  children?: JSX.Element;
}
export function Link(p: LinkProps) {
  const disabled = () => Boolean(p.disabled || p.loading);
  const classes = () =>
    cn(
      buttonVariants({
        variant: p.variant,
        size: p.size,
        disabled: disabled(),
      }),
      p.class
    );
  const content = () => (p.loading ? 'Loading...' : p.children);
  const icon = () => p.icon;
  const marketing = () => p.size === 'action' || p.size === 'action-lg';
  const iconEl = () =>
    icon() && (
      <Dynamic
        component={icon()!}
        size={16}
        strokeWidth={2}
        class={marketing() ? 'shrink-0 md:size-5' : undefined}
      />
    );
  if (p.href)
    return (
      <a
        href={p.href}
        target={p.target}
        rel={p.rel}
        style={p.style}
        class={classes()}
        aria-disabled={disabled()}
      >
        {content()}
        {p.showIcon && !p.loading && <ArrowRight size={18} />} {iconEl()}
      </a>
    );
  return (
    <button
      type={p.type ?? 'button'}
      disabled={disabled()}
      style={p.style}
      class={classes()}
    >
      {content()}
      {p.showIcon && !p.loading && <ArrowRight size={18} />} {iconEl()}
    </button>
  );
}
