import { type ClassValue, clsx } from 'clsx';
import { extendTailwindMerge } from 'tailwind-merge';

/**
 * Registers the custom design-scale classes so tailwind-merge understands them.
 * Without this, `text-(length:--text-fluid-md)` would be mistaken for a text *colour* and
 * silently removed when it sits next to `text-white`.
 */
const twMerge = extendTailwindMerge({
  extend: {
    theme: {
      text: ['fluid-xs', 'fluid-sm', 'fluid-md', 'fluid-lg', 'fluid-xl', 'fluid-2xl', 'fluid-3xl', 'fluid-4xl', 'fluid-5xl'],
      leading: ['110', '115', '120', '126', '143', '145', '150', '160', '165'],
      tracking: ['tight-20', 'tight-30', 'tight-8', 'wide-130', 'wide-140'],
      radius: ['10', '15', '20', '30', '5xl'],
      shadow: ['offset-sm', 'offset-md', 'offset-lg'],
      container: ['8xl', '9xl'],
      font: ['ui', 'heading'],
    },
    classGroups: {
      'bg-image': [
        {
          bg: ['glow', 'overlay-strong', 'overlay-side', 'overlay-primary', 'scrim'],
        },
      ],
    },
  },
});

/** Joins class names and resolves Tailwind conflicts; the last utility wins. */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
