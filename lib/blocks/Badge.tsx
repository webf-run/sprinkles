import { type VariantProps, cva } from 'class-variance-authority';
import clsx from 'clsx';
import type { Component, JSX } from 'solid-js';

const badgeVariants = cva(
  'inline-flex items-center justify-center font-semibold leading-normal tracking-widest',
  {
    variants: {
      variant: {
        purple: 'bg-badge-purple-background text-badge-purple-foreground',
        orange: 'bg-badge-orange-background text-badge-orange-foreground',
        green: 'bg-badge-green-background text-badge-green-foreground',
        blue: 'bg-badge-blue-background text-badge-blue-foreground',
        neutral: 'bg-badge-neutral-background text-badge-neutral-foreground',
        pink: 'bg-badge-pink-background text-badge-pink-foreground',
      },

      size: {
        sm: 'px-3 py-1.5 text-xs',
        md: 'px-4 py-2 text-sm',
        lg: 'px-5 py-2.5 text-base',
      },
    },

    defaultVariants: {
      variant: 'purple',
      size: 'md',
    },
  }
);

interface Props extends VariantProps<typeof badgeVariants> {
  class?: string;
  children?: JSX.Element;
}

const Badge: Component<Props> = (props) => {
  const className = () => props.class ?? '';

  // A caller-supplied rounded-* utility (e.g. `rounded-md`) should win over
  // the default pill shape, same rule the Astro version used.
  const hasCustomRadius = () =>
    /(?:^|\s)rounded(?:-[^\s]+)?(?=\s|$)/.test(className());
  const shapeClass = () => (hasCustomRadius() ? '' : 'rounded-full');

  return (
    <span
      class={clsx(
        badgeVariants({ variant: props.variant, size: props.size }),
        shapeClass(),
        className()
      )}
    >
      {props.children}
    </span>
  );
};

export default Badge;
