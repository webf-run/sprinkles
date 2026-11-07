import { cva } from 'class-variance-authority';
import { Dynamic } from 'solid-js/web';

import type { FillStyle } from '../core/control';
import { type Tone, ToneFill, toTone } from '../core/tone';
import type { IconComponent } from '../types';
import { cn } from '../utils';

const tile = cva(
  'box-border flex shrink-0 items-center justify-center border border-transparent',
  {
    variants: {
      size: {
        m: 'size-10 rounded-xl *:size-5',
        l: 'size-12 rounded-xl *:size-6',
        xl: 'size-14 rounded-2xl *:size-6',
      },
    },
    defaultVariants: { size: 'l' },
  }
);

export interface IconTileProps {
  icon: IconComponent;
  /** A tone, or `inverse` for the dark tile of `surface-inverse`. */
  variant?: Tone | 'inverse';
  fillStyle?: Exclude<FillStyle, 'outline'>;
  /** 40, 48 or 56 px. */
  size?: 'm' | 'l' | 'xl';
  class?: string;
}

/** A rounded square holding a decorative icon, e.g. beside an announcement. */
export function IconTile(props: IconTileProps) {
  const colour = () =>
    props.variant === 'inverse'
      ? 'bg-surface-inverse text-foreground-inverse'
      : ToneFill[toTone(props.variant)][props.fillStyle ?? 'bold'];

  return (
    <span
      aria-hidden='true'
      class={cn(tile({ size: props.size }), colour(), props.class)}
    >
      <Dynamic component={props.icon} />
    </span>
  );
}
