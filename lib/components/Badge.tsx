import { cva } from 'class-variance-authority';
import { type Component, type JSX, Show } from 'solid-js';
import { Dynamic } from 'solid-js/web';

import type { FillStyle, Size, StaticColor } from '../core/control';
import { type Tone, ToneFill, toTone } from '../core/tone';
import { cn } from '../utils';

export type BadgeVariant = Tone;

/**
 * Colours for a label: grey text on a grey wash (`muted`, for white
 * sections) or on a white pill (`surface`, for tinted or dark sections), or
 * dark grey text on the soft lilac fill (`soft`, for tags and level labels).
 */
export type BadgeLabelTone = 'muted' | 'surface' | 'soft';

const LabelFills: Record<BadgeLabelTone, string> = {
  muted: 'bg-surface-quiet text-foreground-quiet',
  surface: 'bg-surface text-foreground-quiet',
  soft: 'bg-surface-soft text-foreground',
};

const StaticFills: Record<StaticColor, Record<FillStyle, string>> = {
  white: {
    bold: 'bg-white text-black',
    subtle: 'border-white/24 bg-white/16 text-white backdrop-blur-sm',
    outline: 'border-white text-white',
  },
  black: {
    bold: 'bg-black text-white',
    subtle: 'border-black/16 bg-black/8 text-black backdrop-blur-sm',
    outline: 'border-black text-black',
  },
};

const badge = cva(
  'box-border inline-flex max-w-full shrink-0 items-center justify-center rounded-full border border-transparent font-semibold whitespace-nowrap',
  {
    variants: {
      size: {
        s: 'h-5 gap-1 px-2 text-xs',
        m: 'h-6 gap-1 px-3 text-xs',
        l: 'h-7 gap-2 px-3 text-sm',
        xl: 'h-8 gap-2 px-4 text-sm',
      },
      fillStyle: { bold: '', subtle: '', outline: 'bg-surface' },
    },
    defaultVariants: { size: 'm', fillStyle: 'subtle' },
  }
);

const IconSizes: Record<Size, string> = {
  s: 'size-3',
  m: 'size-3',
  l: 'size-4',
  xl: 'size-4',
};

export interface BadgeProps {
  /**
   * Section-label colours (background and text only). Replaces the colours of
   * `variant`, `fillStyle` and `staticColor`; size, padding and type stay
   * as `size` and `class` set them.
   */
  labelTone?: BadgeLabelTone;
  /** A semantic role, `highlight`, or a categorical colour. */
  variant?: BadgeVariant;
  fillStyle?: FillStyle;
  size?: Size;
  /** Over photos or colour: white or black regardless of the theme. */
  staticColor?: StaticColor;
  icon?: Component<{ class?: string; 'aria-hidden'?: boolean | 'true' }>;
  class?: string;
  children?: JSX.Element;
}

/**
 * A short, non-interactive label: a status, a category, a count. Labels
 * aren't controls, so they sit half a step below the control scale:
 * 20, 24, 28 and 32 px for S–XL.
 */
export function Badge(props: BadgeProps) {
  const fill = () => props.fillStyle ?? 'subtle';
  const size = () => props.size ?? 'm';
  const colour = () =>
    props.staticColor
      ? StaticFills[props.staticColor][fill()]
      : ToneFill[toTone(props.variant)][fill()];
  const classes = () =>
    cn(
      badge({ size: size(), fillStyle: props.labelTone ? 'subtle' : fill() }),
      props.labelTone ? LabelFills[props.labelTone] : colour(),
      props.class
    );

  return (
    <span class={classes()}>
      <Show when={props.icon}>
        {(icon) => (
          <Dynamic
            component={icon()}
            class={IconSizes[size()]}
            aria-hidden='true'
          />
        )}
      </Show>
      {props.children}
    </span>
  );
}
