import { For, Show } from 'solid-js';

import { cardSurface } from '../core/card';
import { type Tone, ToneFill } from '../core/tone';
import { cn } from '../utils';

export interface TimelineItem {
  /** Marker text shown in colour, e.g. a year, a time or `Week 1`. */
  label: string;
  /** What happened. */
  text: string;
}

/**
 * - `vertical`: a rail on the left with the entries stacked beside it.
 * - `split`: labels in their own column on the left, text beside the rail.
 * - `alternating`: a centred rail with entries on both sides. Stacks on a
 *   narrow container.
 * - `horizontal`: entries side by side along a rail. Stacks on a narrow
 *   container.
 * - `cards`: each entry in its own card. Two columns, then one row.
 */
export type TimelineLayout =
  'vertical' | 'split' | 'alternating' | 'horizontal' | 'cards';

/** `dot` is a small dot; `number` is a numbered circle, for steps. */
export type TimelineMarker = 'dot' | 'number';

/** Any of the library's tones, or `inverse` for a dark background. */
export type TimelineVariant = Tone | 'inverse';

export interface TimelineProps {
  items: TimelineItem[];
  /** How the entries are arranged. Defaults to `vertical`. */
  layout?: TimelineLayout;
  /** The colour of the labels and markers. Defaults to `accent`. */
  variant?: TimelineVariant;
  /** What marks each entry. Defaults to `dot`. */
  marker?: TimelineMarker;
  /** Sets the width and spacing of the whole timeline. */
  class?: string;
}

/*
 * Class names are spelled out in full (not built from the tone's name) so
 * Tailwind finds them when it scans the library.
 */

/** The colour of a label on the page surface. */
const LabelText: Record<Tone, string> = {
  accent: 'text-accent-subtle-foreground',
  neutral: 'text-neutral-subtle-foreground',
  informative: 'text-informative-subtle-foreground',
  positive: 'text-positive-subtle-foreground',
  notice: 'text-notice-subtle-foreground',
  negative: 'text-negative-subtle-foreground',
  highlight: 'text-highlight-subtle-foreground',
  seafoam: 'text-seafoam-subtle-foreground',
  indigo: 'text-indigo-subtle-foreground',
  purple: 'text-purple-subtle-foreground',
  fuchsia: 'text-fuchsia-subtle-foreground',
  yellow: 'text-yellow-subtle-foreground',
};

/** The rail is a tint (30%) of the colour of the list, so it follows the tone. */
const Rail = 'border-current/30';
const RailBar = 'before:border-current/30';
const RailBarWide = '@lg:before:border-current/30';

/** Colours on a light page and on a dark band; `undefined` falls back to the tone's. */
const Looks = {
  default: {
    label: undefined,
    railText: undefined,
    text: 'text-foreground-strong',
    card: undefined,
  },
  // On `surface-inverse`: white text and the `highlight` colour, the one
  // tone designed for a dark band.
  inverse: {
    label: 'text-highlight',
    railText: 'text-foreground-inverse',
    text: 'text-foreground-inverse',
    card: 'border-border-inverse/20 bg-foreground-inverse/10',
  },
} as const;

/**
 * A vertical or horizontal timeline: an ordered list of dated moments.
 * Plain markup with no JavaScript, so it can be server-rendered. The wide
 * layouts follow the width of the timeline itself, not the window's.
 */
export function Timeline(props: TimelineProps) {
  const layout = () => props.layout ?? 'vertical';
  const numbered = () => props.marker === 'number';
  const look = () =>
    props.variant === 'inverse' ? Looks.inverse : Looks.default;
  const tone = (): Tone =>
    props.variant === 'inverse' ? 'highlight' : (props.variant ?? 'accent');
  const label = () => look().label ?? LabelText[tone()];
  const railText = () => look().railText ?? LabelText[tone()];

  const list = () => {
    switch (layout()) {
      case 'split':
        return cn('m-0 list-none p-0', railText());
      case 'alternating':
        return cn(
          'relative m-0 list-none p-0',
          railText(),
          'before:absolute before:inset-y-0 before:left-0 before:border-l-2',
          '@lg:before:left-1/2 @lg:before:-translate-x-px',
          RailBar
        );
      case 'horizontal':
        return cn(
          'm-0 list-none border-l-2 p-0',
          railText(),
          '@lg:relative @lg:grid @lg:auto-cols-fr @lg:grid-flow-col @lg:gap-6',
          '@lg:border-l-0 @lg:before:absolute @lg:before:inset-x-0',
          '@lg:before:border-t-2',
          numbered() ? '@lg:before:top-3' : '@lg:before:top-1',
          Rail,
          RailBarWide
        );
      case 'cards':
        return cn(
          'm-0 grid list-none gap-4 p-0 @lg:grid-cols-2',
          '@4xl:grid-flow-col @4xl:auto-cols-fr @4xl:grid-cols-none'
        );
      default:
        return cn('m-0 list-none border-l-2 p-0', railText(), Rail);
    }
  };

  /** Where the marker sits, and how it moves between wide and narrow. */
  const markerPlace = (index: number) => {
    const top = numbered() ? 'top-px' : 'top-2';
    switch (layout()) {
      case 'alternating':
        return cn(
          'absolute left-px -translate-x-1/2',
          top,
          index % 2 === 0
            ? '@lg:right-0 @lg:left-auto @lg:translate-x-1/2'
            : '@lg:left-0'
        );
      case 'horizontal':
        return cn(
          'absolute -left-px -translate-x-1/2',
          top,
          '@lg:-top-px @lg:left-0 @lg:translate-x-0'
        );
      case 'cards':
        return '';
      default:
        return cn('absolute -left-px -translate-x-1/2', top);
    }
  };

  const item = (index: number) => {
    switch (layout()) {
      case 'alternating':
        return cn(
          'relative box-border pb-8 last:pb-0 @lg:w-1/2',
          numbered() ? 'pl-10' : 'pl-6',
          index % 2 === 0
            ? cn(
                '@lg:pl-0 @lg:text-right',
                numbered() ? '@lg:pr-12' : '@lg:pr-10'
              )
            : cn('@lg:ml-auto', numbered() ? '@lg:pl-12' : '@lg:pl-10')
        );
      case 'horizontal':
        return cn(
          'relative pb-7 last:pb-0 @lg:pb-0 @lg:pl-0',
          numbered() ? 'pl-10 @lg:pt-10' : 'pl-6 @lg:pt-6'
        );
      case 'split':
        return 'group flex';
      case 'cards':
        return cn(
          'flex flex-col gap-3 rounded-2xl border p-6',
          look().card ?? cardSurface(tone(), 'outline')
        );
      default:
        return cn('relative pb-7 last:pb-0', numbered() ? 'pl-10' : 'pl-6');
    }
  };

  const Marker = (p: { index: number }) => (
    <span
      aria-hidden='true'
      class={cn(
        numbered()
          ? 'grid size-7 place-items-center rounded-full text-fluid-xs font-semibold'
          : layout() === 'cards'
            ? 'h-1 w-10 rounded-full'
            : 'size-3 rounded-full',
        ToneFill[tone()].bold,
        markerPlace(p.index)
      )}
    >
      <Show when={numbered()}>{p.index + 1}</Show>
    </span>
  );

  const Text = (p: { text: string; class?: string }) => (
    <p class={cn('m-0 text-fluid-md', look().text, p.class)}>{p.text}</p>
  );

  return (
    <div class={cn('@container', props.class)}>
      <ol class={list()}>
        <For each={props.items}>
          {(entry, index) => (
            <li class={item(index())}>
              <Show
                when={layout() === 'split'}
                fallback={
                  <>
                    <Marker index={index()} />
                    <p class={cn('m-0 font-heading text-fluid-2xl', label())}>
                      {entry.label}
                    </p>
                    <Text text={entry.text} class='mt-1' />
                  </>
                }
              >
                <p
                  class={cn(
                    'm-0 box-border w-20 shrink-0 pr-4 text-right font-heading text-fluid-xl @sm:w-36 @sm:pr-6',
                    label()
                  )}
                >
                  {entry.label}
                </p>
                <div
                  class={cn(
                    'relative box-border min-w-0 flex-1 border-l-2 pb-7 group-last:pb-0',
                    numbered() ? 'pl-10' : 'pl-6',
                    Rail
                  )}
                >
                  <Marker index={index()} />
                  <Text text={entry.text} />
                </div>
              </Show>
            </li>
          )}
        </For>
      </ol>
    </div>
  );
}
