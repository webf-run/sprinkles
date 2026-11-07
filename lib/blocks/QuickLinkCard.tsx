import ArrowRight from 'lucide-solid/icons/arrow-right';
import { Show } from 'solid-js';
import { Dynamic } from 'solid-js/web';

import { CardLift, cardIcon, cardSurface } from '../core/card';
import { type FillStyle, FocusWithinRing } from '../core/control';
import { type Tone, toTone } from '../core/tone';
import type { IconComponent } from '../types';
import { cn } from '../utils';

export interface QuickLinkCardProps {
  title: string;
  description?: string;
  href: string;
  /** A number or short label in the chip, e.g. "1" for the first step. */
  step?: string;
  /** An icon in the chip, in place of `step`. */
  icon?: IconComponent;
  /** The tone of the chip (or the card, with `subtle` and `bold`). */
  variant?: Tone;
  fillStyle?: FillStyle;
  class?: string;
}

/**
 * A card that is one big link: a numbered or icon chip, a title and a short
 * description. The title is the link; the whole card is its target.
 */
export function QuickLinkCard(props: QuickLinkCardProps) {
  const tone = () => toTone(props.variant, 'accent');
  const fill = () => props.fillStyle ?? 'outline';

  return (
    <article
      class={cn(
        'group relative flex w-full flex-col items-start gap-6 rounded-2xl border p-6',
        cardSurface(tone(), fill()),
        CardLift,
        'active:translate-y-0 active:shadow-none',
        fill() === 'outline' && 'hover:border-border-accent',
        FocusWithinRing,
        props.class
      )}
    >
      <Show when={props.icon || props.step}>
        <span
          aria-hidden={props.icon ? 'true' : undefined}
          class={cn(
            'flex size-12 shrink-0 items-center justify-center rounded-full text-fluid-xl font-semibold',
            cardIcon(tone(), fill())
          )}
        >
          <Show when={props.icon} fallback={props.step}>
            {(icon) => <Dynamic component={icon()} class='size-6' />}
          </Show>
        </span>
      </Show>

      <div class='flex w-full min-w-0 flex-col gap-2'>
        <h3 class='m-0 text-fluid-xl font-semibold wrap-break-word'>
          <a
            href={props.href}
            class='text-inherit no-underline outline-none after:absolute after:inset-0 after:rounded-2xl'
          >
            {props.title}
          </a>
        </h3>
        <Show when={props.description}>
          <p
            class={cn(
              'm-0 text-fluid-md',
              fill() !== 'bold' && 'text-foreground-muted'
            )}
          >
            {props.description}
          </p>
        </Show>
      </div>

      <ArrowRight
        aria-hidden='true'
        class='mt-auto size-6 motion-safe:transition-transform motion-safe:duration-200 motion-safe:ease-standard group-hover:translate-x-1'
      />
    </article>
  );
}
