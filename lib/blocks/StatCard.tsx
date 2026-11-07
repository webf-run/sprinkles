import { cva } from 'class-variance-authority';
import { Show } from 'solid-js';
import { Dynamic } from 'solid-js/web';

import { CardLift, cardIcon, cardSurface } from '../core/card';
import type { FillStyle } from '../core/control';
import { type Tone, toTone } from '../core/tone';
import type { IconComponent } from '../types';
import { cn } from '../utils';

const card = cva(
  'box-border flex min-w-0 flex-col items-center justify-center rounded-3xl border text-center',
  {
    variants: {
      size: {
        s: 'w-full max-w-36 shrink-0 gap-2 p-4',
        m: 'w-full max-w-48 shrink-0 gap-2 p-5',
        /** Square on phones, a fixed height from md, with large type. */
        l: [
          'aspect-square h-auto min-h-32 w-full max-w-64 min-w-32 gap-2 px-4 py-5',
          'md:aspect-auto md:h-50 md:px-6 md:py-6 xl:px-8',
        ],
      },
    },
    defaultVariants: { size: 'm' },
  }
);

const Chip = { s: 'size-9', m: 'size-10', l: 'size-10' } as const;

const Value = {
  s: 'text-xl leading-normal tracking-tight',
  m: 'text-2xl leading-normal tracking-tight',
  l: 'text-xl leading-none sm:text-2xl xl:text-4xl',
} as const;

const Label = {
  s: 'text-sm leading-tight font-semibold',
  m: 'text-sm leading-tight font-semibold',
  l: 'max-w-full text-xs leading-tight hyphens-none sm:text-sm md:text-base xl:text-xl',
} as const;

export interface StatCardProps {
  /** Optional; large cards usually go without. */
  icon?: IconComponent;
  value: string;
  label: string;
  /** The tone of the icon chip (or the card, with `subtle` and `bold`). */
  variant?: Tone;
  fillStyle?: FillStyle;
  size?: 's' | 'm' | 'l';
  /** `false` shows the icon without its chip. */
  iconBackground?: boolean;
  /** Lift on hover. Use it only when the card is inside a link. */
  lift?: boolean;
  iconClass?: string;
  valueClass?: string;
  labelClass?: string;
  class?: string;
}

/** A figure and what it counts, e.g. "98% / placement rate". */
export function StatCard(props: StatCardProps) {
  const size = () => props.size ?? 'm';
  const tone = () => toTone(props.variant, 'accent');
  const fill = () => props.fillStyle ?? 'outline';

  return (
    <div
      class={cn(
        card({ size: size() }),
        cardSurface(tone(), fill()),
        props.lift && CardLift,
        props.class
      )}
    >
      <Show when={props.icon}>
        {(icon) => (
          <div
            aria-hidden='true'
            class={cn(
              'flex shrink-0 items-center justify-center rounded-full',
              Chip[size()],
              props.iconBackground === false
                ? 'text-current'
                : cardIcon(tone(), fill())
            )}
          >
            <Dynamic
              component={icon()}
              class={cn('size-6 shrink-0', props.iconClass)}
            />
          </div>
        )}
      </Show>
      <p class={cn('m-0 font-semibold', Value[size()], props.valueClass)}>
        {props.value}
      </p>
      <p class={cn('m-0 wrap-break-word', Label[size()], props.labelClass)}>
        {props.label}
      </p>
    </div>
  );
}
