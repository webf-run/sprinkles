import { type VariantProps, cva } from 'class-variance-authority';
import { ArrowRight } from 'lucide-solid';
import type { JSX } from 'solid-js';
import { Dynamic } from 'solid-js/web';

import type { IconComponent } from '../types';
import { cn } from '../utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 rounded-lg border font-semibold transition-all duration-300 focus:outline-none focus:ring-2',
  {
    variants: {
      variant: {
        primary: 'border-transparent bg-primary text-primary-foreground',
        secondary:
          'border-secondary-border bg-secondary text-secondary-foreground',
        success: 'border-success-border bg-success text-success-foreground',
        purple:
          'rounded-md border-secondary-border bg-accent text-sm text-accent-foreground',
        blackwhite:
          'border-border-subtle bg-secondary text-sm text-foreground-muted',
        /** Solid orange call-to-action. */
        highlight:
          'border-0 bg-highlight text-highlight-foreground hover:bg-highlight-hover active:bg-highlight-active',
        /** Brand-coloured outline. */
        outline:
          'border-brand bg-transparent text-brand hover:bg-brand-wash active:bg-badge-purple-background',
        /** White outline for dark / photo backgrounds. */
        inverse:
          'border-white bg-transparent text-white hover:bg-white/15 active:bg-white/25',
        /** Deep-purple solid button. */
        dark: 'border-0 bg-brand-strong text-white hover:bg-brand-strong-hover',
      },
      size: {
        sm: 'px-4 py-2 text-sm',
        md: 'px-6 py-3 text-sm',
        lg: 'px-8 py-4 text-lg',
        /** Marketing button, 48px tall (56px from md). */
        action:
          'h-12 cursor-pointer gap-1 duration-200 ease-out px-5 text-lg leading-165 whitespace-nowrap hover:-translate-y-px active:translate-y-0 focus:ring-0 focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 md:h-14 md:gap-2 md:px-6',
        /** Large marketing button. */
        'action-lg':
          'cursor-pointer gap-1 duration-200 ease-out px-6 py-4 text-body leading-165 whitespace-nowrap hover:-translate-y-px active:translate-y-0 focus:ring-0 focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 md:gap-2 md:px-7 xl:rounded-xl',
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
