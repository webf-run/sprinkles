import { cva } from 'class-variance-authority';
import { Dynamic } from 'solid-js/web';

import { CardLift, cardIcon, cardSurface } from '../core/card';
import type { FillStyle } from '../core/control';
import { type Tone, toTone } from '../core/tone';
import type { IconComponent } from '../types';
import { cn } from '../utils';

const card = cva('box-border flex w-full items-center rounded-2xl border', {
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
  s: 'size-10 rounded-xl',
  m: 'size-14 rounded-2xl',
  l: 'size-16 rounded-2xl',
} as const;
const Icon = { s: 'size-5', m: 'size-7', l: 'size-8' } as const;
const Title = { s: 'text-base', m: 'text-xl', l: 'text-2xl' } as const;
const Subtitle = { s: 'text-sm', m: 'text-base', l: 'text-lg' } as const;

export interface FeatureCardProps {
  title: string;
  subtitle: string;
  icon: IconComponent;
  /** The tone of the icon chip (or the card, with `subtle` and `bold`). */
  variant?: Tone;
  fillStyle?: FillStyle;
  size?: 's' | 'm' | 'l';
  /** Lift on hover. Use it only when the card is inside a link. */
  lift?: boolean;
  class?: string;
  titleClass?: string;
  subtitleClass?: string;
  iconClass?: string;
}

/** An icon chip beside a title and a short line, e.g. "Research labs / 28 centres". */
export function FeatureCard(props: FeatureCardProps) {
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
      <div
        aria-hidden='true'
        class={cn(
          'flex shrink-0 items-center justify-center',
          Chip[size()],
          cardIcon(tone(), fill()),
          props.iconClass
        )}
      >
        <Dynamic component={props.icon} class={Icon[size()]} />
      </div>
      <div class='flex min-w-0 flex-col justify-center gap-1'>
        <h4
          class={cn(
            'm-0 leading-snug font-semibold',
            Title[size()],
            props.titleClass
          )}
        >
          {props.title}
        </h4>
        <p
          class={cn(
            'm-0 leading-normal',
            Subtitle[size()],
            fill() !== 'bold' && 'text-foreground-muted',
            props.subtitleClass
          )}
        >
          {props.subtitle}
        </p>
      </div>
    </div>
  );
}
