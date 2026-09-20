import clsx from 'clsx';
import { LoaderCircle } from 'lucide-solid';
import { type JSX, Show, splitProps } from 'solid-js';

import style from './Button.module.css';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps
  extends JSX.ButtonHTMLAttributes<HTMLButtonElement> {
  /** State */
  disabled?: boolean;
  loading?: boolean;

  /** Styling */
  variant?: ButtonVariant;
  size?: ButtonSize;
  iconOnly?: boolean;
  class?: string;

  /** Content */
  children: JSX.Element;

  /** Events */
  onClick?: (event: MouseEvent) => void;
}

export function Button(props: ButtonProps) {
  const [local, rest] = splitProps(props, [
    'class',
    'children',
    'disabled',
    'loading',
    'variant',
    'size',
    'iconOnly',
    'onClick',
    'type',
  ]);

  const handleClick = (event: MouseEvent) => {
    if (local.loading || local.disabled) {
      event.preventDefault();
      return;
    }

    local.onClick?.(event);
  };

  return (
    <button
      {...rest}
      class={clsx(
        style.button,
        style[local.variant ?? 'primary'],
        local.disabled && style.disabled,
        local.loading && style.loading,
        local.iconOnly && style.iconOnly,
        local.class
      )}
      data-size={local.size ?? 'md'}
      disabled={local.disabled || local.loading}
      type={local.type ?? 'button'}
      onClick={handleClick}
    >
      <Show when={local.loading}>
        <LoaderCircle class={style.spinner} />
      </Show>
      <span
        class={clsx(style.content, {
          [style.loading]: local.loading,
        })}
      >
        {local.children}
      </span>
    </button>
  );
}
