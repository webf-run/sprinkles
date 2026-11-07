import { cva } from 'class-variance-authority';
import { type Component, type JSX, Show, splitProps } from 'solid-js';
import { Dynamic } from 'solid-js/web';

import {
  ControlGap,
  ControlHeight,
  ControlMinWidth,
  ControlPadding,
  ControlRadius,
  ControlReset,
  ControlText,
  Disabled,
  FocusRing,
  IconSize,
  type Size,
  type StaticColor,
  Transition,
} from '../core/control';
import { cn } from '../utils';
import { Spinner } from './Spinner';

export type ButtonVariant =
  'accent' | 'primary' | 'secondary' | 'negative' | 'highlight';
export type ButtonFillStyle = 'bold' | 'outline';

const button = cva(
  [
    'relative inline-flex shrink-0 items-center justify-center border-2 font-semibold whitespace-nowrap no-underline select-none',
    'cursor-pointer',
    ControlReset,
    FocusRing,
    Transition,
    Disabled,
  ],
  {
    variants: {
      variant: {
        accent: '',
        primary: '',
        secondary: '',
        negative: '',
        highlight: '',
      },
      fillStyle: { bold: '', outline: 'bg-transparent' },
      staticColor: { none: '', white: '', black: '' },
      size: {
        s: [
          ControlHeight.s,
          ControlMinWidth.s,
          ControlPadding.s,
          ControlText.s,
          ControlGap.s,
          ControlRadius.s,
        ],
        m: [
          ControlHeight.m,
          ControlMinWidth.m,
          ControlPadding.m,
          ControlText.m,
          ControlGap.m,
          ControlRadius.m,
        ],
        l: [
          ControlHeight.l,
          ControlMinWidth.l,
          ControlPadding.l,
          ControlText.l,
          ControlGap.l,
          ControlRadius.l,
        ],
        xl: [
          ControlHeight.xl,
          ControlMinWidth.xl,
          ControlPadding.xl,
          ControlText.xl,
          ControlGap.xl,
          ControlRadius.xl,
        ],
      },
      inactive: {
        true: 'pointer-events-none',
        false: '',
      },
    },
    compoundVariants: [
      // Bold: a solid fill in the role's colour.
      {
        staticColor: 'none',
        fillStyle: 'bold',
        variant: 'accent',
        class:
          'border-transparent bg-accent text-accent-foreground hover:bg-accent-hover active:bg-accent-down',
      },
      {
        staticColor: 'none',
        fillStyle: 'bold',
        variant: 'primary',
        class:
          'border-transparent bg-neutral text-neutral-foreground hover:bg-neutral-hover active:bg-neutral-down',
      },
      {
        staticColor: 'none',
        fillStyle: 'bold',
        variant: 'secondary',
        class:
          'border-transparent bg-neutral-subtle text-neutral-subtle-foreground hover:bg-neutral/12 active:bg-neutral/20',
      },
      {
        staticColor: 'none',
        fillStyle: 'bold',
        variant: 'negative',
        class:
          'border-transparent bg-negative text-negative-foreground hover:bg-negative-hover active:bg-negative-down',
      },
      {
        staticColor: 'none',
        fillStyle: 'bold',
        variant: 'highlight',
        class:
          'border-transparent bg-highlight text-highlight-foreground hover:bg-highlight-hover active:bg-highlight-down',
      },

      // Outline: the role's colour as a border and label, tinted on hover.
      {
        staticColor: 'none',
        fillStyle: 'outline',
        variant: 'accent',
        class:
          'border-accent text-accent hover:bg-accent-subtle active:bg-accent/16',
      },
      {
        staticColor: 'none',
        fillStyle: 'outline',
        variant: 'primary',
        class:
          'border-neutral text-neutral hover:bg-neutral-subtle active:bg-neutral/16',
      },
      {
        staticColor: 'none',
        fillStyle: 'outline',
        variant: 'secondary',
        class:
          'border-border text-foreground-strong hover:bg-neutral-subtle active:bg-neutral/12',
      },
      {
        staticColor: 'none',
        fillStyle: 'outline',
        variant: 'negative',
        class:
          'border-negative text-negative hover:bg-negative-subtle active:bg-negative/16',
      },
      {
        staticColor: 'none',
        fillStyle: 'outline',
        variant: 'highlight',
        class:
          'border-highlight text-foreground-strong hover:bg-highlight-subtle active:bg-highlight/24',
      },

      // Static white or black, over photos and colour: the theme is ignored.
      {
        staticColor: 'white',
        fillStyle: 'bold',
        class:
          'border-transparent bg-white text-black hover:bg-white/90 active:bg-white/80',
      },
      {
        staticColor: 'white',
        fillStyle: 'outline',
        class: 'border-white text-white hover:bg-white/16 active:bg-white/24',
      },
      {
        staticColor: 'black',
        fillStyle: 'bold',
        class:
          'border-transparent bg-black text-white hover:bg-black/85 active:bg-black/75',
      },
      {
        staticColor: 'black',
        fillStyle: 'outline',
        class: 'border-black text-black hover:bg-black/8 active:bg-black/16',
      },
    ],
    defaultVariants: {
      variant: 'accent',
      fillStyle: 'bold',
      staticColor: 'none',
      size: 'm',
      inactive: false,
    },
  }
);

/**
 * Disabled looks the same for every variant: quiet, and clearly unavailable.
 * It restates hover and pressed so the variant's own don't show through.
 */
const DisabledLook =
  'border-transparent bg-neutral-subtle text-foreground-subtle hover:bg-neutral-subtle hover:text-foreground-subtle active:bg-neutral-subtle';

type IconComponent = Component<{
  class?: string;
  'aria-hidden'?: boolean | 'true';
}>;

export interface ButtonProps {
  /** `accent` for the call to action, `primary` for strong neutral actions,
      `secondary` for everything else, `negative` for destructive actions,
      `highlight` for a design's second emphasis colour. */
  variant?: ButtonVariant;
  fillStyle?: ButtonFillStyle;
  size?: Size;
  /** Over photos or colour: white or black regardless of the theme. */
  staticColor?: StaticColor;
  /** Shows a spinner and blocks presses while keeping the button's width. */
  pending?: boolean;
  disabled?: boolean;
  /** Renders a link that looks like a button. */
  href?: string;
  target?: string;
  rel?: string;
  type?: 'button' | 'submit' | 'reset';
  /** Icon before the label (a lucide-solid icon). */
  icon?: IconComponent;
  /** Icon after the label. */
  iconEnd?: IconComponent;
  /** Required when the button has no visible label. */
  'aria-label'?: string;
  /** For a button that opens a menu, popover or drawer. */
  'aria-expanded'?: boolean;
  'aria-controls'?: string;
  'aria-haspopup'?: boolean | 'menu' | 'dialog' | 'listbox';
  id?: string;
  ref?: (element: HTMLElement) => void;
  form?: string;
  onClick?: JSX.EventHandlerUnion<HTMLElement, MouseEvent>;
  class?: string;
  children?: JSX.Element;
}

/**
 * The button (plan §7, "Actions"). Renders a `<button>`, or an `<a>` with
 * `href`. Pending keeps the label in place (invisible) so the width doesn't
 * jump, announces itself as busy, and ignores presses.
 */
export function Button(props: ButtonProps) {
  const [local, rest] = splitProps(props, [
    'variant',
    'fillStyle',
    'size',
    'staticColor',
    'pending',
    'disabled',
    'href',
    'icon',
    'iconEnd',
    'class',
    'children',
    'type',
  ]);

  const size = () => local.size ?? 'm';
  const unavailable = () => Boolean(local.disabled);
  const classes = () =>
    cn(
      button({
        variant: local.variant,
        fillStyle: local.fillStyle,
        staticColor: local.staticColor ?? 'none',
        size: size(),
        inactive: Boolean(local.pending),
      }),
      unavailable() && DisabledLook,
      local.class
    );

  const content = () => (
    <>
      <span
        class={cn(
          'inline-flex items-center',
          ControlGap[size()],
          local.pending && 'invisible'
        )}
      >
        <Show when={local.icon}>
          {(icon) => (
            <Dynamic
              component={icon()}
              class={IconSize[size()]}
              aria-hidden='true'
            />
          )}
        </Show>
        <Show when={local.children}>
          <span>{local.children}</span>
        </Show>
        <Show when={local.iconEnd}>
          {(icon) => (
            <Dynamic
              component={icon()}
              class={IconSize[size()]}
              aria-hidden='true'
            />
          )}
        </Show>
      </span>
      <Show when={local.pending}>
        <span class='absolute inset-0 flex items-center justify-center'>
          <Spinner tone='current' size='s' label='Pending' />
        </span>
      </Show>
    </>
  );

  return (
    <Show
      when={local.href !== undefined && !unavailable()}
      fallback={
        <button
          {...rest}
          type={local.type ?? 'button'}
          class={classes()}
          disabled={unavailable()}
          aria-busy={local.pending || undefined}
          aria-disabled={local.pending || undefined}
        >
          {content()}
        </button>
      }
    >
      <a
        {...rest}
        href={local.href}
        class={classes()}
        aria-busy={local.pending || undefined}
      >
        {content()}
      </a>
    </Show>
  );
}
