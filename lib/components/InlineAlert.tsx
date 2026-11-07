import CircleAlert from 'lucide-solid/icons/circle-alert';
import CircleCheck from 'lucide-solid/icons/circle-check';
import Info from 'lucide-solid/icons/info';
import TriangleAlert from 'lucide-solid/icons/triangle-alert';
import { type Component, type JSX, Show } from 'solid-js';
import { Dynamic } from 'solid-js/web';

import { ToneSubtleSurface } from '../core/tone';
import { cn } from '../utils';

export type InlineAlertVariant =
  'neutral' | 'informative' | 'positive' | 'notice' | 'negative';
export type InlineAlertFillStyle = 'border' | 'subtle';

export interface InlineAlertProps {
  /** What kind of message it is; also picks the icon. */
  variant?: InlineAlertVariant;
  /** `border` (default) on a plain surface; `subtle` tints the whole block. */
  fillStyle?: InlineAlertFillStyle;
  /** One line that sums it up. */
  heading?: JSX.Element;
  /** The message. */
  children?: JSX.Element;
  /** Buttons or links that resolve it: “Review changes”, “Retry”. */
  actions?: JSX.Element;
  /**
   * Announce it at once (`role='alert'`). Only for a message that appears
   * after something the person did, like a failed save; never for one
   * that's there when the page loads.
   */
  urgent?: boolean;
  class?: string;
}

/** Border style: a 2 px rule in the role's bold colour on the page surface. */
const BorderColour: Record<InlineAlertVariant, string> = {
  neutral: 'border-border-strong',
  informative: 'border-informative',
  positive: 'border-positive',
  notice: 'border-notice',
  negative: 'border-negative',
};

/** Icons take the role's colour; on a tint, its `-subtle-foreground`, checked against that tint. */
const IconColour: Record<
  InlineAlertFillStyle,
  Record<InlineAlertVariant, string>
> = {
  border: {
    neutral: 'text-foreground-muted',
    informative: 'text-informative',
    positive: 'text-positive',
    notice: 'text-notice',
    negative: 'text-negative',
  },
  subtle: {
    neutral: 'text-neutral-subtle-foreground',
    informative: 'text-informative-subtle-foreground',
    positive: 'text-positive-subtle-foreground',
    notice: 'text-notice-subtle-foreground',
    negative: 'text-negative-subtle-foreground',
  },
};

const Icons: Record<
  InlineAlertVariant,
  Component<{ class?: string; 'aria-hidden'?: 'true' }> | undefined
> = {
  neutral: undefined,
  informative: Info,
  positive: CircleCheck,
  notice: TriangleAlert,
  negative: CircleAlert,
};

/**
 * A message that stays in the page until its cause is fixed: a page that
 * is scheduled, an edit conflict, a form that failed to save. For a
 * passing confirmation use a Toast; for a decision that must be made now,
 * an AlertDialog.
 */
export function InlineAlert(props: InlineAlertProps) {
  const variant = () => props.variant ?? 'neutral';
  const fill = () => props.fillStyle ?? 'border';

  return (
    <div
      role={props.urgent ? 'alert' : undefined}
      class={cn(
        'box-border flex gap-3 rounded-xl border-2 p-4 text-sm text-foreground',
        fill() === 'border'
          ? cn('bg-surface', BorderColour[variant()])
          : cn('border-transparent', ToneSubtleSurface[variant()]),
        props.class
      )}
    >
      <Show when={Icons[variant()]}>
        {(icon) => (
          <span class='flex h-5 shrink-0 items-center'>
            <Dynamic
              component={icon()}
              class={cn('size-5', IconColour[fill()][variant()])}
              aria-hidden='true'
            />
          </span>
        )}
      </Show>

      <div class='flex min-w-0 flex-1 flex-col gap-1'>
        <Show when={props.heading}>
          <p class='m-0 leading-5 font-semibold text-foreground-strong'>
            {props.heading}
          </p>
        </Show>
        <Show when={props.children}>
          <div class='leading-5'>{props.children}</div>
        </Show>
        <Show when={props.actions}>
          <div class='mt-2 flex flex-wrap items-center gap-3'>
            {props.actions}
          </div>
        </Show>
      </div>
    </div>
  );
}
