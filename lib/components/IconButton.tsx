import { type Component, type JSX, splitProps } from 'solid-js';

import type { Size, StaticColor } from '../core/control';
import { cn } from '../utils';
import { Button, type ButtonFillStyle, type ButtonVariant } from './Button';

type IconComponent = Component<{
  class?: string;
  'aria-hidden'?: boolean | 'true';
}>;

/** Square at every size: the control's height as its width too. */
const Square: Record<Size, string> = {
  s: 'w-6',
  m: 'w-8',
  l: 'w-10',
  xl: 'w-12',
};

/**
 * Quiet: no fill or border until hovered (Spectrum's quiet action button).
 * The role's colour moves to the icon; hover and press tint the background.
 */
const QuietLook: Record<ButtonVariant, string> = {
  accent:
    'border-transparent bg-transparent text-accent hover:bg-accent-subtle active:bg-accent/16',
  primary:
    'border-transparent bg-transparent text-foreground-strong hover:bg-neutral-subtle active:bg-neutral/12',
  secondary:
    'border-transparent bg-transparent text-foreground-strong hover:bg-neutral-subtle active:bg-neutral/12',
  negative:
    'border-transparent bg-transparent text-negative hover:bg-negative-subtle active:bg-negative/16',
  highlight:
    'border-transparent bg-transparent text-foreground-strong hover:bg-highlight-subtle active:bg-highlight/24',
};

const QuietStaticLook: Record<StaticColor, string> = {
  white:
    'border-transparent bg-transparent text-white hover:bg-white/16 active:bg-white/24',
  black:
    'border-transparent bg-transparent text-black hover:bg-black/8 active:bg-black/16',
};

/** Disabled stays put on hover and press, quiet or not. */
const DisabledQuiet =
  'bg-transparent text-foreground-subtle hover:bg-transparent active:bg-transparent';
const DisabledFilled = 'hover:bg-neutral-subtle active:bg-neutral-subtle';

export interface IconButtonProps {
  /** The one icon (a lucide-solid icon), sized by the button. */
  icon: IconComponent;
  /** Names the action for screen readers: “Edit page”, not “Pencil”. */
  'aria-label': string;
  /** Same meanings as Button's; defaults to `secondary`, since an icon alone is rarely the call to action. */
  variant?: ButtonVariant;
  fillStyle?: ButtonFillStyle;
  size?: Size;
  /** Over photos or colour: white or black regardless of the theme. */
  staticColor?: StaticColor;
  /** No fill or border until hovered, for toolbars, table rows and headers. */
  quiet?: boolean;
  /** Shows a spinner in place of the icon and blocks presses. */
  pending?: boolean;
  disabled?: boolean;
  /** Renders a link that looks like an icon button. */
  href?: string;
  target?: string;
  rel?: string;
  type?: 'button' | 'submit' | 'reset';
  form?: string;
  id?: string;
  /** For buttons that open a menu, dialog or drawer. */
  'aria-expanded'?: boolean;
  'aria-controls'?: string;
  'aria-haspopup'?: boolean | 'menu' | 'dialog' | 'listbox';
  'aria-describedby'?: string;
  onClick?: JSX.EventHandlerUnion<HTMLElement, MouseEvent>;
  class?: string;
}

/**
 * A square button that shows one icon. It is a Button underneath, so
 * variants, fill styles, sizes, pending and links behave the same; `quiet`
 * drops the fill until hover.
 */
export function IconButton(props: IconButtonProps) {
  const [local, rest] = splitProps(props, [
    'variant',
    'size',
    'staticColor',
    'quiet',
    'disabled',
    'class',
  ]);

  const size = () => local.size ?? 'm';
  const variant = () => local.variant ?? 'secondary';

  const quietLook = () => {
    if (!local.quiet) return undefined;
    return local.staticColor
      ? QuietStaticLook[local.staticColor]
      : QuietLook[variant()];
  };
  const disabledLook = () => {
    if (!local.disabled) return undefined;
    return local.quiet ? DisabledQuiet : DisabledFilled;
  };

  return (
    <Button
      {...rest}
      variant={variant()}
      size={size()}
      staticColor={local.staticColor}
      disabled={local.disabled}
      class={cn(
        'box-border px-0',
        Square[size()],
        quietLook(),
        disabledLook(),
        local.class
      )}
    />
  );
}
