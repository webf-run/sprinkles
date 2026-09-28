import { type ClassValue, clsx } from 'clsx';
import { extendTailwindMerge } from 'tailwind-merge';

/** Registers the custom type-scale classes so they aren't mistaken for text colors. */
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      'font-size': [{ text: ['body', 'body-sm', 'eyebrow', 'subtitle'] }],
    },
  },
});

/** Joins class names and resolves Tailwind conflicts; the last utility wins. */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
