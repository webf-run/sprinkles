import { type VariantProps, cva } from 'class-variance-authority';
import { Dynamic } from 'solid-js/web';

import type { IconComponent } from '../types';
import { cn } from '../utils';

const iconTileVariants = cva(
  'flex shrink-0 items-center justify-center border-[0.8px] text-surface-soft',
  {
    variants: {
      tone: {
        plum: 'size-13.5 rounded-20 border-purple-575 bg-purple-785',
        /* #202226 fill, 0.8px #3B3740 border */
        ink: 'size-10.5 rounded-15 border-neutral-760 bg-neutral-875 *:size-5 xl:size-14.5 xl:*:size-6',
      },
    },
    defaultVariants: { tone: 'ink' },
  }
);

export interface IconTileProps extends VariantProps<typeof iconTileVariants> {
  icon: IconComponent;
  class?: string;
}

/** Rounded square holding a decorative icon at its natural size: 54px (plum) or 58px (ink). */
export function IconTile(props: IconTileProps) {
  return (
    <span class={cn(iconTileVariants({ tone: props.tone }), props.class)}>
      <Dynamic component={props.icon} />
    </span>
  );
}
