import { cva } from 'class-variance-authority';
import { type JSX, splitProps } from 'solid-js';

import { FocusRing, type StaticColor, Transition } from '../core/control';
import { cn } from '../utils';

const link = cva(
  [
    'rounded-xs underline underline-offset-4 decoration-1 hover:decoration-2',
    FocusRing,
    Transition,
  ],
  {
    variants: {
      variant: {
        /** Stands out from the text around it. */
        accent: 'text-accent hover:text-accent-hover active:text-accent-down',
        /** Takes the colour of the text around it. */
        secondary: 'text-inherit',
      },
      staticColor: {
        none: '',
        white: 'text-white hover:text-white',
        black: 'text-black hover:text-black',
      },
      quiet: {
        /** No underline until hovered: for links whose context already says "link" (navigation, lists). */
        true: 'no-underline hover:underline',
        false: '',
      },
    },
    defaultVariants: { variant: 'accent', staticColor: 'none', quiet: false },
  }
);

export interface LinkProps extends Omit<
  JSX.AnchorHTMLAttributes<HTMLAnchorElement>,
  'class'
> {
  variant?: 'accent' | 'secondary';
  staticColor?: StaticColor;
  quiet?: boolean;
  class?: string;
  children?: JSX.Element;
}

/**
 * An inline text link. For an action that looks like a button, use
 * `<Button href>` instead.
 */
export function Link(props: LinkProps) {
  const [local, rest] = splitProps(props, [
    'variant',
    'staticColor',
    'quiet',
    'class',
    'children',
  ]);

  return (
    <a
      {...rest}
      class={cn(
        link({
          variant: local.variant,
          staticColor: local.staticColor ?? 'none',
          quiet: Boolean(local.quiet),
        }),
        local.class
      )}
    >
      {local.children}
    </a>
  );
}
