import { type VariantProps, cva } from 'class-variance-authority';
import { Dynamic } from 'solid-js/web';

import type { IconComponent } from '../types';
import { cn } from '../utils';

const featureCardVariants = cva(
  'flex w-full items-center rounded-3xl border transition-shadow duration-200',
  {
    variants: {
      variant: {
        default: 'border-border bg-surface',
        muted: 'border-border bg-surface-muted',
        accent: 'border-surface-accent-strong bg-surface-accent',
        inverse: 'border-accent bg-accent text-accent-foreground',
        purple: 'border-badge-purple-background bg-badge-purple-background',
        orange: 'border-badge-orange-background bg-badge-orange-background',
        green: 'border-badge-green-background bg-badge-green-background',
        blue: 'border-badge-blue-background bg-badge-blue-background',
        neutral: 'border-badge-neutral-background bg-badge-neutral-background',
        brand: 'rounded-badge-tag border-brand-line bg-surface',
      },
      size: {
        sm: 'gap-3 px-4 py-3',
        md: 'gap-4 px-5 py-4',
        lg: 'gap-5 px-6 py-5',
        fluid: 'gap-3.5 px-3.5 py-3 md:gap-4 md:px-4.5 md:py-4 2xl:min-h-25',
      },
      effect: {
        none: '',
        lift: 'hover:-translate-y-1 hover:shadow-lg',
        glow: 'hover:shadow-md hover:shadow-primary/25',
      },
    },
    defaultVariants: { variant: 'default', size: 'md', effect: 'none' },
  }
);
const text = cva('text-foreground', {
  variants: {
    variant: {
      default: 'text-foreground',
      muted: 'text-foreground',
      accent: 'text-foreground',
      inverse: 'text-accent-foreground',
      purple: 'text-badge-purple-foreground',
      orange: 'text-badge-orange-foreground',
      green: 'text-badge-green-foreground',
      blue: 'text-badge-blue-foreground',
      neutral: 'text-badge-neutral-foreground',
      brand: 'text-ink',
    },
  },
  defaultVariants: { variant: 'default' },
});
const iconBox = cva('flex shrink-0 items-center justify-center rounded-2xl', {
  variants: {
    variant: {
      default: 'bg-surface-muted text-foreground',
      muted: 'bg-surface text-foreground',
      accent: 'bg-surface-accent-strong text-primary',
      inverse: 'bg-accent-foreground/20 text-accent-foreground',
      purple: 'bg-badge-purple-foreground/15 text-badge-purple-foreground',
      orange: 'bg-badge-orange-foreground/15 text-badge-orange-foreground',
      green: 'bg-badge-green-foreground/15 text-badge-green-foreground',
      blue: 'bg-badge-blue-foreground/15 text-badge-blue-foreground',
      neutral: 'bg-badge-neutral-foreground/15 text-badge-neutral-foreground',
      brand: 'rounded-badge-outline bg-brand-tile text-brand-deep',
    },
    size: {
      sm: 'size-10',
      md: 'size-14',
      lg: 'size-16',
      fluid: 'size-9 md:size-11',
    },
  },
  defaultVariants: { variant: 'default', size: 'md' },
});
const titleSize = {
  sm: 'text-base',
  md: 'text-xl',
  lg: 'text-2xl',
  fluid: 'text-card-feature-title leading-120',
} as const;
const subtitleSize = {
  sm: 'text-xs',
  md: 'text-base',
  lg: 'text-lg',
  fluid: 'text-card-feature-description leading-120',
} as const;
const iconSize = {
  sm: 'size-5',
  md: 'size-7',
  lg: 'size-8',
  fluid: 'size-3.5',
} as const;

interface FeatureCardProps extends VariantProps<typeof featureCardVariants> {
  title: string;
  subtitle: string;
  icon: IconComponent;
  class?: string;
}
export function FeatureCard(props: FeatureCardProps) {
  const size = () => props.size ?? 'md';
  const variant = () => props.variant ?? 'default';
  return (
    <div
      class={cn(
        featureCardVariants({
          variant: variant(),
          size: size(),
          effect: props.effect,
        }),
        props.class
      )}
    >
      <div class={cn(iconBox({ variant: variant(), size: size() }))}>
        <Dynamic component={props.icon} class={iconSize[size()]} />
      </div>
      <div class='flex min-w-0 flex-col justify-center'>
        <h4
          class={cn(
            'leading-normal font-semibold',
            titleSize[size()],
            text({ variant: variant() })
          )}
        >
          {props.title}
        </h4>
        <p
          class={cn(
            'mt-1 leading-normal opacity-80',
            subtitleSize[size()],
            text({ variant: variant() }),
            variant() === 'brand' && 'text-ink-muted opacity-100'
          )}
        >
          {props.subtitle}
        </p>
      </div>
    </div>
  );
}
