import { cva } from 'class-variance-authority';
import Quote from 'lucide-solid/icons/quote';
import Star from 'lucide-solid/icons/star';
import { For, Show } from 'solid-js';

import { cardIcon, cardSurface } from '../core/card';
import type { FillStyle } from '../core/control';
import { type Tone, toTone } from '../core/tone';
import { cn } from '../utils';

const card = cva('m-0 flex w-full flex-col rounded-2xl border', {
  variants: {
    size: {
      s: 'gap-3 p-5',
      m: 'gap-4 p-6',
      l: 'gap-6 p-8',
    },
  },
  defaultVariants: { size: 'm' },
});

const Chip = { s: 'size-8', m: 'size-10', l: 'size-12' } as const;
const ChipIcon = { s: 'size-4', m: 'size-5', l: 'size-6' } as const;
const StarSize = { s: 'size-4', m: 'size-4', l: 'size-5' } as const;
const QuoteText = {
  s: 'text-fluid-sm',
  m: 'text-fluid-md',
  l: 'text-fluid-xl',
} as const;
const Avatar = {
  s: 'size-9 text-xs',
  m: 'size-10 text-sm',
  l: 'size-12 text-base',
} as const;
const Caption = { s: 'text-sm', m: 'text-sm', l: 'text-base' } as const;

/** The five positions of a star rating. */
const StarSlots = [1, 2, 3, 4, 5] as const;

export interface TestimonialCardProps {
  quote: string;
  name: string;
  /** Their role, title or relationship, e.g. "Parent of a Grade 4 student". */
  role?: string;
  /** Photo URL. Without it, the card shows their initials. */
  avatar?: string;
  /** Stars out of five, rounded to a whole star. */
  rating?: number;
  /** The tone of the quote mark and initials (or the card, with `subtle` and `bold`). */
  variant?: Tone;
  fillStyle?: FillStyle;
  size?: 's' | 'm' | 'l';
  class?: string;
}

/** Up to two initials from a name: "Amara Chen" → "AC". */
function initialsOf(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0]?.toUpperCase())
    .join('');
}

/** A quote and the person who said it, with an optional photo and rating. */
export function TestimonialCard(props: TestimonialCardProps) {
  const size = () => props.size ?? 'm';
  const tone = () => toTone(props.variant, 'accent');
  const fill = () => props.fillStyle ?? 'outline';
  const chip = () => cardIcon(tone(), fill());
  const muted = () => (fill() === 'bold' ? undefined : 'text-foreground-muted');
  const rating = () =>
    props.rating === undefined
      ? undefined
      : Math.min(5, Math.max(0, Math.round(props.rating)));

  return (
    <figure
      class={cn(
        card({ size: size() }),
        cardSurface(tone(), fill()),
        props.class
      )}
    >
      <div class='flex items-center justify-between gap-3'>
        <span
          aria-hidden='true'
          class={cn(
            'flex shrink-0 items-center justify-center rounded-full',
            Chip[size()],
            chip()
          )}
        >
          <Quote class={ChipIcon[size()]} fill='currentColor' stroke='none' />
        </span>

        <Show when={rating() !== undefined}>
          <div
            role='img'
            aria-label={`Rated ${rating()} out of 5`}
            class='flex items-center gap-1'
          >
            <For each={StarSlots}>
              {(slot) => (
                <Star
                  aria-hidden='true'
                  class={cn(StarSize[size()], slot > rating()! && 'opacity-30')}
                  fill='currentColor'
                  stroke='none'
                />
              )}
            </For>
          </div>
        </Show>
      </div>

      <blockquote class={cn('m-0 flex-1 font-medium', QuoteText[size()])}>
        {props.quote}
      </blockquote>

      <figcaption class='flex items-center gap-3'>
        <Show
          when={props.avatar}
          fallback={
            <span
              aria-hidden='true'
              class={cn(
                'flex shrink-0 items-center justify-center rounded-full font-semibold',
                Avatar[size()],
                chip()
              )}
            >
              {initialsOf(props.name)}
            </span>
          }
        >
          {(avatar) => (
            <img
              src={avatar()}
              alt=''
              class={cn('shrink-0 rounded-full object-cover', Avatar[size()])}
            />
          )}
        </Show>
        <span class={cn('flex min-w-0 flex-col', Caption[size()])}>
          <span class='font-semibold'>{props.name}</span>
          <Show when={props.role}>
            <span class={muted()}>{props.role}</span>
          </Show>
        </span>
      </figcaption>
    </figure>
  );
}
