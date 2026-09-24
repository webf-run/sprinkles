import { type VariantProps, cva } from 'class-variance-authority';
import { ArrowRight } from 'lucide-solid';
import type { Component, JSX } from 'solid-js';
import { Dynamic } from 'solid-js/web';

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
      },
      size: {
        sm: 'px-4 py-2 text-sm',
        md: 'px-6 py-3 text-sm',
        lg: 'px-8 py-4 text-lg',
      },
      disabled: {
        true: 'pointer-events-none cursor-not-allowed opacity-50',
        false: '',
      },
    },
    defaultVariants: { variant: 'primary', size: 'md', disabled: false },
  }
);
export interface Props extends VariantProps<typeof buttonVariants> {
  href?: string;
  disabled?: boolean;
  loading?: boolean;
  type?: 'button' | 'submit' | 'reset';
  class?: string;
  style?: string;
  target?: string;
  rel?: string;
  showIcon?: boolean;
  icon?: Component<any>;
  children?: JSX.Element;
}
export default function Link(p: Props) {
  const disabled = () => Boolean(p.disabled || p.loading);
  const classes = () =>
    `${buttonVariants({ variant: p.variant, size: p.size, disabled: disabled() })} ${p.class ?? ''}`;
  const content = () => (p.loading ? 'Loading...' : p.children);
  const icon = () => p.icon;
  const iconEl = () =>
    icon() && <Dynamic component={icon()!} size={16} strokeWidth={2} />;
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
