import { type VariantProps, cva } from 'class-variance-authority';
import { Dynamic } from 'solid-js/web';

import type { IconComponent } from '../types';
import { cn } from '../utils';

const iconTileVariants = cva(
  'flex shrink-0 items-center justify-center border-[0.8px] text-tile-foreground',
  {
    variants: {
      tone: {
        plum: 'size-13.5 rounded-tile border-brand-plum-line bg-brand-plum',
        /* #202226 fill, 0.8px #3B3740 border */
        ink: 'size-14.5 rounded-badge-tag border-tile-ink-line bg-tile-ink',
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
