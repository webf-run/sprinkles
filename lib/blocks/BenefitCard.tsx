import { type VariantProps, cva } from 'class-variance-authority';
import { Check } from 'lucide-solid';
import { For } from 'solid-js';
import { Dynamic } from 'solid-js/web';

import type { IconComponent } from '../types';
import { cn } from '../utils';

const benefitCardVariants = cva(
  'flex w-full flex-col rounded-3xl border transition-shadow duration-200',
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
        warm: 'border-white bg-orange-30 text-primary-darker',
        light: 'border-white bg-surface-soft text-primary-darker',
      },
      size: {
        sm: 'gap-3 px-4 py-3',
        md: 'gap-4 px-5 py-4',
        lg: 'gap-5 px-6 py-5',
        highlight: [
          'min-h-70 max-w-92 gap-5 px-6 py-6',
          'md:h-75 md:max-w-82 md:gap-6 md:px-7 md:py-7',
          'xl:h-78 xl:max-w-92 xl:gap-8 xl:px-9 xl:py-9',
        ],
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
const benefitCardTextVariants = cva('text-foreground', {
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
      warm: 'text-primary-darker',
      light: 'text-primary-darker',
    },
  },
  defaultVariants: { variant: 'default' },
});
const benefitCardIconVariants = cva(
  'flex shrink-0 items-center justify-center rounded-2xl',
  {
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
        warm: 'rounded-none bg-transparent text-primary-darker',
        light: 'rounded-none bg-transparent text-primary-darker',
      },
      size: {
        sm: 'size-9',
        md: 'size-11',
        lg: 'size-13',
        highlight: 'size-10',
      },
    },
    defaultVariants: { variant: 'default', size: 'md' },
  }
);

const headingSize = {
  sm: 'text-base',
  md: 'text-lg',
  lg: 'text-xl',
  highlight: 'text-fluid-xl',
} as const;
const listGap = {
  sm: 'gap-1.5',
  md: 'gap-2',
  lg: 'gap-2.5',
  highlight: 'gap-2',
} as const;
const bulletSize = {
  sm: 'text-xs',
  md: 'text-sm',
  lg: 'text-base',
  highlight: 'text-fluid-sm',
} as const;

interface BenefitCardProps extends VariantProps<typeof benefitCardVariants> {
  title: string;
  bullets: string[];
  icon?: IconComponent;
  class?: string;
  titleClass?: string;
  bulletClass?: string;
  iconClass?: string;
}
export function BenefitCard(props: BenefitCardProps) {
  const size = () => props.size ?? 'md';
  const variant = () => props.variant ?? 'default';
  const Icon = () => props.icon;
  return (
    <div
      class={cn(
        benefitCardVariants({
          variant: variant(),
          size: size(),
          effect: props.effect,
        }),
        props.class
      )}
    >
      {Icon() && (
        <div
          class={cn(
            benefitCardIconVariants({ variant: variant(), size: size() }),
            props.iconClass
          )}
        >
          <Dynamic
            component={Icon()!}
            class={
              size() === 'highlight'
                ? 'size-10'
                : size() === 'sm'
                  ? 'size-4'
                  : size() === 'md'
                    ? 'size-5'
                    : 'size-6'
            }
          />
        </div>
      )}
      <div class={cn('flex min-w-0 flex-col', listGap[size()])}>
        <h4
          class={cn(
            'leading-normal font-semibold',
            headingSize[size()],
            benefitCardTextVariants({ variant: variant() }),
            props.titleClass
          )}
        >
          {props.title}
        </h4>
        <ul class={cn('flex list-none flex-col p-0', listGap[size()])}>
          <For each={props.bullets}>
            {(bullet) => (
              <li class='flex items-start gap-2'>
                {variant() === 'warm' || variant() === 'light' ? (
                  <span
                    aria-hidden='true'
                    class='mt-2 size-1.5 shrink-0 rounded-full bg-primary-darker'
                  />
                ) : (
                  <Check
                    class={cn(
                      'mt-0.5 shrink-0 opacity-70',
                      size() === 'sm' ? 'size-3.5' : 'size-4',
                      benefitCardTextVariants({ variant: variant() })
                    )}
                    strokeWidth={2.5}
                  />
                )}
                <span
                  class={cn(
                    'leading-normal opacity-80',
                    bulletSize[size()],
                    benefitCardTextVariants({ variant: variant() }),
                    (variant() === 'warm' || variant() === 'light') &&
                      'font-normal opacity-100',
                    props.bulletClass
                  )}
                >
                  {bullet}
                </span>
              </li>
            )}
          </For>
        </ul>
      </div>
    </div>
  );
}
