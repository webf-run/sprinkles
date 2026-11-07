import { Toggle as ArkToggle } from '@ark-ui/solid/toggle';
import { cva } from 'class-variance-authority';
import { type Component, type JSX, Show, children, splitProps } from 'solid-js';
import { Dynamic } from 'solid-js/web';

import {
  ControlGap,
  ControlHeight,
  ControlMinWidth,
  ControlPadding,
  ControlRadius,
  ControlText,
  Disabled,
  FocusRing,
  IconSize,
  type Size,
  Transition,
} from '../core/control';
import { cn } from '../utils';

type IconComponent = Component<{
  class?: string;
  'aria-hidden'?: boolean | 'true';
}>;

/**
 * Ark's toggle root is a `<button>` with `aria-pressed`, `data-state='on'|'off'`
 * and `data-pressed` while on; the pressed look hangs off `data-pressed`.
 */
const toggle = cva(
  [
    'relative m-0 box-border inline-flex shrink-0 cursor-pointer items-center justify-center border-2 border-transparent font-semibold whitespace-nowrap select-none',
    FocusRing,
    Transition,
    Disabled,
    // Off: the secondary button's quiet grey fill.
    'bg-neutral-subtle text-foreground-strong hover:bg-neutral/12 active:bg-neutral/20',
    // On: a bold neutral fill, so the pressed state reads at a glance.
    'data-pressed:bg-neutral data-pressed:text-neutral-foreground data-pressed:hover:bg-neutral-hover data-pressed:active:bg-neutral-down',
    // Disabled: grey text; a pressed toggle keeps a darker fill so its state still shows.
    'disabled:bg-neutral-subtle disabled:text-foreground-subtle disabled:hover:bg-neutral-subtle disabled:active:bg-neutral-subtle',
    'disabled:data-pressed:bg-neutral/16 disabled:data-pressed:text-foreground-subtle disabled:data-pressed:hover:bg-neutral/16',
  ],
  {
    variants: {
      size: {
        s: [
          ControlHeight.s,
          ControlMinWidth.s,
          ControlText.s,
          ControlGap.s,
          ControlRadius.s,
        ],
        m: [
          ControlHeight.m,
          ControlMinWidth.m,
          ControlText.m,
          ControlGap.m,
          ControlRadius.m,
        ],
        l: [
          ControlHeight.l,
          ControlMinWidth.l,
          ControlText.l,
          ControlGap.l,
          ControlRadius.l,
        ],
        xl: [
          ControlHeight.xl,
          ControlMinWidth.xl,
          ControlText.xl,
          ControlGap.xl,
          ControlRadius.xl,
        ],
      },
      quiet: {
        // No fill until hovered; pressed still gets the bold fill.
        true: 'bg-transparent hover:bg-neutral-subtle active:bg-neutral/12 disabled:bg-transparent disabled:hover:bg-transparent disabled:active:bg-transparent',
        false: '',
      },
      iconOnly: { true: 'px-0', false: '' },
    },
    compoundVariants: [
      { iconOnly: false, size: 's', class: ControlPadding.s },
      { iconOnly: false, size: 'm', class: ControlPadding.m },
      { iconOnly: false, size: 'l', class: ControlPadding.l },
      { iconOnly: false, size: 'xl', class: ControlPadding.xl },
      { iconOnly: true, size: 's', class: 'w-6' },
      { iconOnly: true, size: 'm', class: 'w-8' },
      { iconOnly: true, size: 'l', class: 'w-10' },
      { iconOnly: true, size: 'xl', class: 'w-12' },
    ],
    defaultVariants: { size: 'm', quiet: false, iconOnly: false },
  }
);

export interface ToggleProps {
  /** Pressed (on) state, when you control it. */
  pressed?: boolean;
  /** Initial pressed state, when the toggle controls itself. */
  defaultPressed?: boolean;
  onPressedChange?: (pressed: boolean) => void;
  disabled?: boolean;
  size?: Size;
  /** No fill until hovered, for toolbars. Pressed still shows the bold fill. */
  quiet?: boolean;
  /** An icon (a lucide-solid icon) before the label, or on its own. */
  icon?: IconComponent;
  /** Required when there is no visible label. Name the setting, not the state: “Bold”, “Pin page”. */
  'aria-label'?: string;
  name?: string;
  id?: string;
  class?: string;
  /** The label. Leave it out for an icon-only (square) toggle. */
  children?: JSX.Element;
}

/**
 * A button that stays pressed: on or off, like Bold in a toolbar or
 * “Pin to top”. Screen readers hear “toggle button, pressed”. For a setting
 * that takes effect immediately in a form, use a Switch instead.
 */
export function Toggle(props: ToggleProps) {
  const [local, rest] = splitProps(props, [
    'size',
    'quiet',
    'icon',
    'class',
    'children',
  ]);
  const size = () => local.size ?? 'm';
  // Resolved once: the label decides whether the toggle is square.
  const label = children(() => local.children);

  return (
    <ArkToggle.Root
      {...rest}
      class={cn(
        toggle({
          size: size(),
          quiet: Boolean(local.quiet),
          iconOnly: !label(),
        }),
        local.class
      )}
    >
      <Show when={local.icon}>
        {(icon) => (
          <Dynamic
            component={icon()}
            class={cn('shrink-0', IconSize[size()])}
            aria-hidden='true'
          />
        )}
      </Show>
      <Show when={label()}>
        <span>{label()}</span>
      </Show>
    </ArkToggle.Root>
  );
}
