import { type ClassValue, clsx } from 'clsx';
import { extendTailwindMerge } from 'tailwind-merge';

/**
 * Registers the custom design-scale classes so tailwind-merge understands them.
 * Without this, `text-lead-sm` would be mistaken for a text *colour* and
 * silently removed when it sits next to `text-white`.
 */
const twMerge = extendTailwindMerge({
  extend: {
    theme: {
      text: [
        'eyebrow',
        'body',
        'body-sm',
        'lead',
        'lead-sm',
        'lead-md',
        'lead-xl',
        'display-sm',
        'display-md',
        'heading-display',
        'heading-display-xl',
        'heading-xl',
        'badge-md',
        'badge-md-mobile',
        'card-heading-sm',
        'card-heading-md',
        'card-heading-lg',
        'card-description-sm',
        'card-description-md',
        'card-description-lg',
        'card-badge-sm',
        'card-badge-md',
        'card-badge-lg',
        'card-tag-sm',
        'card-tag-md',
        'card-cta',
      ],
      tracking: [
        'tight-30',
        'tight-20',
        'tight-10',
        'tight-8',
        'wide-130',
        'wide-140',
      ],
      leading: ['110', '115', '120', '126', '143', '145', '150', '160', '165'],
      radius: ['badge-md', 'badge-md-mobile', 'badge-tag', 'badge-outline'],
      shadow: ['card-purple'],
      font: ['badge'],
      spacing: [
        'header',
        'badge-md-height',
        'badge-md-x',
        'badge-md-y',
        'badge-md-mobile-width',
        'badge-md-mobile-height',
        'badge-md-mobile-x',
        'badge-md-mobile-y',
        'badge-md-mobile-gap',
      ],
    },
    classGroups: {
      'font-size': [{ text: ['subtitle'] }],
      'bg-image': [{ bg: ['glow'] }],
    },
  },
});

/** Joins class names and resolves Tailwind conflicts; the last utility wins. */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
