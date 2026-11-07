import type { FillStyle } from './control';
import {
  type Tone,
  ToneFill,
  ToneIcon,
  ToneIconOnSubtle,
  ToneSubtleSurface,
} from './tone';

/**
 * The shared look of the marketing cards (FeatureCard, BenefitCard,
 * StatCard): `variant` picks the tone, `fillStyle` how strongly it shows.
 *
 * - `outline` (default): a surface card with a quiet border; the tone shows
 *   in the icon chip only.
 * - `subtle`: the card itself is tinted.
 * - `bold`: a solid card in the tone, with its foreground colour.
 *
 * Text colour is set on the card and inherited, so a site can recolour a
 * card's text with one class.
 */
export function cardSurface(tone: Tone, fillStyle: FillStyle): string {
  if (fillStyle === 'bold') return `border-transparent ${ToneFill[tone].bold}`;
  if (fillStyle === 'subtle')
    return `border-transparent text-foreground-strong ${ToneSubtleSurface[tone]}`;
  return 'border-border-subtle bg-surface text-foreground-strong';
}

/** The icon chip that matches `cardSurface`. */
export function cardIcon(tone: Tone, fillStyle: FillStyle): string {
  if (fillStyle === 'bold') return 'bg-current/16 text-current';
  if (fillStyle === 'subtle') return ToneIconOnSubtle[tone];
  return ToneIcon[tone];
}

/** Lifts a card on hover, for cards that are links. */
export const CardLift =
  'motion-safe:transition motion-safe:duration-200 motion-safe:ease-standard motion-safe:hover:-translate-y-1 hover:shadow-elevated';
