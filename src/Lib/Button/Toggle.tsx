import { Toggle as ArkToggle } from '@ark-ui/solid/toggle';
import clsx from 'clsx';
import { type JSX, Show, splitProps } from 'solid-js';

import style from './Toggle.module.css';

export type ToggleSize = 'sm' | 'md' | 'lg';
export type ToggleVariant = 'primary' | 'secondary' | 'outline';

export interface ToggleProps {
  /** State */
  disabled?: boolean;
  pressed?: boolean;

  /** Styling */
  size?: ToggleSize;
  variant?: ToggleVariant;
  class?: string;

  /** Content */
  children?: JSX.Element;
  pressedContent?: JSX.Element;

  /** Events */
  onPressedChange?: (pressed: boolean) => void;
}

export function Toggle(props: ToggleProps) {
  const [local, rest] = splitProps(props, [
    'class',
    'children',
    'pressedContent',
    'disabled',
    'pressed',
    'variant',
    'size',
    'onPressedChange',
  ]);

  return (
    <ArkToggle.Root
      {...rest}
      class={clsx(
        style.toggle,
        style[local.variant ?? 'primary'],
        local.disabled && style.disabled,
        local.class
      )}
      data-size={local.size ?? 'md'}
      disabled={local.disabled}
      pressed={local.pressed}
      onPressedChange={local.onPressedChange}
    >
      <Show when={local.pressedContent} fallback={local.children}>
        <ArkToggle.Indicator fallback={local.children}>
          {local.pressedContent}
        </ArkToggle.Indicator>
      </Show>
    </ArkToggle.Root>
  );
}
