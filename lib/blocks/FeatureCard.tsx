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
        accent: 'border-surface-emphasis bg-surface-soft',
        inverse: 'border-accent bg-accent text-accent-foreground',
        purple: 'border-surface-soft bg-surface-soft',
        orange: 'border-orange-55 bg-orange-55',
        green: 'border-green-40 bg-green-40',
        blue: 'border-blue-80 bg-blue-80',
        neutral: 'border-neutral-40 bg-neutral-40',
        brand: 'rounded-15 border-purple-90 bg-surface',
        surface: 'border-border-accent bg-surface transition-colors',
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
      purple: 'text-primary',
      orange: 'text-orange-540',
      green: 'text-green-530',
      blue: 'text-blue-610',
      neutral: 'text-neutral-650',
      brand: 'text-foreground-strongest',
      surface: 'text-foreground-strong',
    },
  },
  defaultVariants: { variant: 'default' },
});
const iconBox = cva('flex shrink-0 items-center justify-center rounded-2xl', {
  variants: {
    variant: {
      default: 'bg-surface-muted text-foreground',
      muted: 'bg-surface text-foreground',
      accent: 'bg-surface-emphasis text-primary',
      inverse: 'bg-accent-foreground/20 text-accent-foreground',
      purple: 'bg-primary/15 text-primary',
      orange: 'bg-orange-540/15 text-orange-540',
      green: 'bg-green-530/15 text-green-530',
      blue: 'bg-blue-610/15 text-blue-610',
      neutral: 'bg-neutral-650/15 text-neutral-650',
      brand: 'rounded-10 bg-purple-80 text-primary-dark',
      surface: 'bg-surface-soft text-primary',
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
  fluid: 'text-[length:clamp(16px,14.0576px_+_0.5178vw,24px)] leading-120',

} as const;
const subtitleSize = {
  sm: 'text-xs',
  md: 'text-base',
  lg: 'text-lg',
  fluid: 'text-[length:clamp(12px,11.272px_+_0.1942vw,15px)] leading-120',

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
        variant() === 'surface' && 'group',
        props.class
      )}
    >
      <div
        class={cn(
          iconBox({ variant: variant(), size: size() }),
          variant() === 'surface' &&
            'group-hover:bg-primary group-hover:text-primary-foreground'
        )}
      >
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
            variant() === 'surface' ? 'text-foreground' : text({ variant: variant() }),
            variant() === 'brand' && 'text-foreground-muted opacity-100'
          )}
        >
          {props.subtitle}
        </p>
      </div>
    </div>
  );
}

