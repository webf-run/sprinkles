import type { Categorical, FillStyle, Role } from './control';

/**
 * The colours a label or a card can take: a semantic role, the design's
 * `highlight`, or a categorical colour (doc/design-tokens.md, "Colour").
 * Badge, the marketing cards and anything else that is "tinted" share it, so
 * `variant='positive' fillStyle='subtle'` looks the same everywhere.
 */
export type Tone = Role | 'highlight' | Categorical;

export const Tones: readonly Tone[] = [
  'accent',
  'neutral',
  'informative',
  'positive',
  'notice',
  'negative',
  'highlight',
  'seafoam',
  'indigo',
  'purple',
  'fuchsia',
  'yellow',
];

/** `tone` if it is a known tone, otherwise `fallback`. */
export function toTone(
  tone: string | undefined,
  fallback: Tone = 'neutral'
): Tone {
  return Tones.includes(tone as Tone) ? (tone as Tone) : fallback;
}

/*
 * Class names are spelled out in full (not built from the tone's name) so
 * Tailwind finds them when it scans the library.
 */

/** Background and text of each tone at each fill style. `outline` adds only the border colour and text. */
export const ToneFill: Record<Tone, Record<FillStyle, string>> = {
  accent: {
    bold: 'bg-accent text-accent-foreground',
    subtle: 'bg-accent-subtle text-accent-subtle-foreground',
    outline: 'border-accent text-accent-subtle-foreground',
  },
  neutral: {
    bold: 'bg-neutral text-neutral-foreground',
    subtle: 'bg-neutral-subtle text-neutral-subtle-foreground',
    outline: 'border-neutral text-neutral-subtle-foreground',
  },
  informative: {
    bold: 'bg-informative text-informative-foreground',
    subtle: 'bg-informative-subtle text-informative-subtle-foreground',
    outline: 'border-informative text-informative-subtle-foreground',
  },
  positive: {
    bold: 'bg-positive text-positive-foreground',
    subtle: 'bg-positive-subtle text-positive-subtle-foreground',
    outline: 'border-positive text-positive-subtle-foreground',
  },
  notice: {
    bold: 'bg-notice text-notice-foreground',
    subtle: 'bg-notice-subtle text-notice-subtle-foreground',
    outline: 'border-notice text-notice-subtle-foreground',
  },
  negative: {
    bold: 'bg-negative text-negative-foreground',
    subtle: 'bg-negative-subtle text-negative-subtle-foreground',
    outline: 'border-negative text-negative-subtle-foreground',
  },
  highlight: {
    bold: 'bg-highlight text-highlight-foreground',
    subtle: 'bg-highlight-subtle text-highlight-subtle-foreground',
    outline: 'border-highlight text-highlight-subtle-foreground',
  },
  seafoam: {
    bold: 'bg-seafoam text-seafoam-foreground',
    subtle: 'bg-seafoam-subtle text-seafoam-subtle-foreground',
    outline: 'border-seafoam text-seafoam-subtle-foreground',
  },
  indigo: {
    bold: 'bg-indigo text-indigo-foreground',
    subtle: 'bg-indigo-subtle text-indigo-subtle-foreground',
    outline: 'border-indigo text-indigo-subtle-foreground',
  },
  purple: {
    bold: 'bg-purple text-purple-foreground',
    subtle: 'bg-purple-subtle text-purple-subtle-foreground',
    outline: 'border-purple text-purple-subtle-foreground',
  },
  fuchsia: {
    bold: 'bg-fuchsia text-fuchsia-foreground',
    subtle: 'bg-fuchsia-subtle text-fuchsia-subtle-foreground',
    outline: 'border-fuchsia text-fuchsia-subtle-foreground',
  },
  yellow: {
    bold: 'bg-yellow text-yellow-foreground',
    subtle: 'bg-yellow-subtle text-yellow-subtle-foreground',
    outline: 'border-yellow text-yellow-subtle-foreground',
  },
};

/** Just the quiet fill of each tone, for surfaces (a tinted card). Text stays the surface's. */
export const ToneSubtleSurface: Record<Tone, string> = {
  accent: 'bg-accent-subtle',
  neutral: 'bg-neutral-subtle',
  informative: 'bg-informative-subtle',
  positive: 'bg-positive-subtle',
  notice: 'bg-notice-subtle',
  negative: 'bg-negative-subtle',
  highlight: 'bg-highlight-subtle',
  seafoam: 'bg-seafoam-subtle',
  indigo: 'bg-indigo-subtle',
  purple: 'bg-purple-subtle',
  fuchsia: 'bg-fuchsia-subtle',
  yellow: 'bg-yellow-subtle',
};

/**
 * An icon "chip" in the tone: the quiet fill with the tone's text colour.
 * The icon chip of a card, a feature list or an empty state.
 */
export const ToneIcon: Record<Tone, string> = {
  accent: 'bg-accent-subtle text-accent-subtle-foreground',
  neutral: 'bg-neutral-subtle text-neutral-subtle-foreground',
  informative: 'bg-informative-subtle text-informative-subtle-foreground',
  positive: 'bg-positive-subtle text-positive-subtle-foreground',
  notice: 'bg-notice-subtle text-notice-subtle-foreground',
  negative: 'bg-negative-subtle text-negative-subtle-foreground',
  highlight: 'bg-highlight-subtle text-highlight-subtle-foreground',
  seafoam: 'bg-seafoam-subtle text-seafoam-subtle-foreground',
  indigo: 'bg-indigo-subtle text-indigo-subtle-foreground',
  purple: 'bg-purple-subtle text-purple-subtle-foreground',
  fuchsia: 'bg-fuchsia-subtle text-fuchsia-subtle-foreground',
  yellow: 'bg-yellow-subtle text-yellow-subtle-foreground',
};

/** The same chip on a tinted (subtle) card: a surface-coloured chip, so it still stands out. */
export const ToneIconOnSubtle: Record<Tone, string> = {
  accent: 'bg-surface text-accent-subtle-foreground',
  neutral: 'bg-surface text-neutral-subtle-foreground',
  informative: 'bg-surface text-informative-subtle-foreground',
  positive: 'bg-surface text-positive-subtle-foreground',
  notice: 'bg-surface text-notice-subtle-foreground',
  negative: 'bg-surface text-negative-subtle-foreground',
  highlight: 'bg-surface text-highlight-subtle-foreground',
  seafoam: 'bg-surface text-seafoam-subtle-foreground',
  indigo: 'bg-surface text-indigo-subtle-foreground',
  purple: 'bg-surface text-purple-subtle-foreground',
  fuchsia: 'bg-surface text-fuchsia-subtle-foreground',
  yellow: 'bg-surface text-yellow-subtle-foreground',
};
