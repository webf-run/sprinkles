import { type VariantProps, cva } from 'class-variance-authority';
import { Dynamic } from 'solid-js/web';

import type { IconComponent } from '../types';
import { cn } from '../utils';

const variants = cva(
  'flex w-full flex-col items-center rounded-2xl border text-center transition-shadow duration-200',
  {
    variants: {
      variant: {
        default: 'border-border bg-surface-muted',
        accent: 'border-surface-accent-strong bg-surface-accent',
        surface: 'border-border bg-surface',
        inverse: 'border-accent bg-accent text-accent-foreground',
        purple: 'border-badge-purple-background bg-badge-purple-background',
        orange: 'border-badge-orange-background bg-badge-orange-background',
        green: 'border-badge-green-background bg-badge-green-background',
        blue: 'border-badge-blue-background bg-badge-blue-background',
        neutral: 'border-badge-neutral-background bg-badge-neutral-background',
      },
      size: {
        sm: 'px-4 py-4',
        md: 'px-5 py-5 md:px-6',
        lg: 'px-6 py-6 md:px-8 md:py-7',
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
      accent: 'text-foreground',
      surface: 'text-foreground',
      inverse: 'text-accent-foreground',
      purple: 'text-badge-purple-foreground',
      orange: 'text-badge-orange-foreground',
      green: 'text-badge-green-foreground',
      blue: 'text-badge-blue-foreground',
      neutral: 'text-badge-neutral-foreground',
    },
  },
  defaultVariants: { variant: 'default' },
});
const icon = cva('', {
  variants: {
    variant: {
      default: 'text-badge-purple-foreground',
      accent: 'text-badge-purple-foreground',
      surface: 'text-foreground-muted',
      inverse: 'text-accent-foreground',
      purple: 'text-badge-purple-foreground',
      orange: 'text-badge-orange-foreground',
      green: 'text-badge-green-foreground',
      blue: 'text-badge-blue-foreground',
      neutral: 'text-badge-neutral-foreground',
    },
  },
  defaultVariants: { variant: 'default' },
});
interface PlacementStatCardProps extends VariantProps<typeof variants> {
  icon: IconComponent;
  value: string;
  title: string;
  subtitle: string;
  iconClass?: string;
  class?: string;
}
export function PlacementStatCard(p: PlacementStatCardProps) {
  const v = () => p.variant ?? 'default';
  return (
    <div
      class={cn(
        variants({ variant: v(), size: p.size, effect: p.effect }),
        p.class
      )}
    >
      <div class='mb-3 flex size-10 shrink-0 items-center justify-center rounded-full'>
        <Dynamic
          component={p.icon}
          class={cn(icon({ variant: v() }), p.iconClass ?? 'size-10')}
        />
      </div>
      <h3 class={cn('text-2xl font-bold md:text-3xl', text({ variant: v() }))}>
        {p.value}
      </h3>
      <p
        class={cn(
          'mt-2 text-sm font-semibold md:text-base',
          text({ variant: v() })
        )}
      >
        {p.title}
      </p>
      <p class={cn('mt-1 text-xs opacity-80', text({ variant: v() }))}>
        {p.subtitle}
      </p>
    </div>
  );
}
