import { cva } from 'class-variance-authority';
import Check from 'lucide-solid/icons/check';
import { For, Show } from 'solid-js';
import { Dynamic } from 'solid-js/web';

import { CardLift, cardIcon, cardSurface } from '../core/card';
import type { FillStyle } from '../core/control';
import { type Tone, toTone } from '../core/tone';
import type { IconComponent } from '../types';
import { cn } from '../utils';

const card = cva('box-border flex w-full flex-col rounded-3xl border', {
  variants: {
    size: {
      s: 'gap-3 px-4 py-3',
      m: 'gap-4 px-5 py-4',
      l: 'gap-5 px-6 py-5',
    },
  },
  defaultVariants: { size: 'm' },
});

const Chip = {
  s: 'size-9 rounded-xl',
  m: 'size-11 rounded-2xl',
  l: 'size-12 rounded-2xl',
} as const;
const Icon = { s: 'size-4', m: 'size-5', l: 'size-6' } as const;
const Title = { s: 'text-base', m: 'text-lg', l: 'text-xl' } as const;
const Bullet = { s: 'text-xs', m: 'text-sm', l: 'text-base' } as const;
const Gap = { s: 'gap-1', m: 'gap-2', l: 'gap-2' } as const;

export interface BenefitCardProps {
  title: string;
  bullets: string[];
  icon?: IconComponent;
  /** The tone of the icon chip (or the card, with `subtle` and `bold`). */
  variant?: Tone;
  fillStyle?: FillStyle;
  size?: 's' | 'm' | 'l';
  /** `false` shows the icon on its own, without a chip. */
  iconBackground?: boolean;
  /** Bullet marker: a check (default) or a dot. */
  marker?: 'check' | 'dot';
  /** Lift on hover. Use it only when the card is inside a link. */
  lift?: boolean;
  class?: string;
  titleClass?: string;
  bulletClass?: string;
  iconClass?: string;
}

/** A titled list of benefits, with an optional icon above. */
export function BenefitCard(props: BenefitCardProps) {
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
              'flex shrink-0 items-center justify-center',
              props.iconBackground === false
                ? 'text-current'
                : [Chip[size()], cardIcon(tone(), fill())],
              props.iconClass
            )}
          >
            <Dynamic component={icon()} class={Icon[size()]} />
          </div>
        )}
      </Show>

      <div class={cn('flex min-w-0 flex-col', Gap[size()])}>
        <h4
          class={cn(
            'm-0 leading-normal font-semibold',
            Title[size()],
            props.titleClass
          )}
        >
          {props.title}
        </h4>
        <ul class={cn('m-0 flex list-none flex-col p-0', Gap[size()])}>
          <For each={props.bullets}>
            {(bullet) => (
              <li class='flex items-start gap-2'>
                <Show
                  when={props.marker === 'dot'}
                  fallback={
                    <Check
                      aria-hidden='true'
                      class='mt-1 size-4 shrink-0'
                      stroke-width={2.5}
                    />
                  }
                >
                  <span
                    aria-hidden='true'
                    class='mt-2 size-2 shrink-0 rounded-full bg-current'
                  />
                </Show>
                <span
                  class={cn(
                    'leading-normal',
                    Bullet[size()],
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
