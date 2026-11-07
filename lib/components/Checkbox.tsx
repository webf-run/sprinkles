import { Checkbox as ArkCheckbox } from '@ark-ui/solid/checkbox';
import { Field as ArkField } from '@ark-ui/solid/field';
import Check from 'lucide-solid/icons/check';
import Minus from 'lucide-solid/icons/minus';
import { Show, children, splitProps } from 'solid-js';

import { ControlText, type Size } from '../core/control';
import { cn } from '../utils';
import { Field, type FieldOptions } from './Field';

/*
 * Checkbox and Switch share one row: the control, then its label. The row is
 * as tall as any other control at the same size (24–48 px), so the whole row
 * is the target. A label that wraps keeps the control on its first line.
 */

/** The clickable row: a `<label>`, so clicking the text toggles the control. */
export const ToggleRow =
  'inline-flex max-w-full items-center self-start select-none';

export const ToggleRowSize: Record<Size, string> = {
  s: 'min-h-6 min-w-6',
  m: 'min-h-8 min-w-8',
  l: 'min-h-10 min-w-10',
  xl: 'min-h-12 min-w-12',
};

/** Gap between the control and its label. */
export const ToggleGap: Record<Size, string> = {
  s: 'gap-2',
  m: 'gap-2',
  l: 'gap-3',
  xl: 'gap-3',
};

/** A box one line of label text tall, so the control lines up with the first line. */
export const ToggleLine: Record<Size, string> = {
  s: 'h-4',
  m: 'h-5',
  l: 'h-6',
  xl: 'h-7',
};

/** The label text beside the control. */
export const ToggleLabel =
  'text-foreground-strong data-disabled:text-foreground-subtle';

/** The one focus ring, drawn when Ark reports keyboard focus on the hidden input. */
export const ToggleFocusRing =
  'data-focus-visible:outline-2 data-focus-visible:outline-offset-2 data-focus-visible:outline-focus-ring';

export const ToggleCursor = (state: {
  disabled?: boolean;
  readOnly?: boolean;
}) =>
  state.disabled
    ? 'cursor-not-allowed'
    : state.readOnly
      ? 'cursor-default'
      : 'cursor-pointer';

const BoxSize: Record<Size, string> = {
  s: 'size-3 rounded-xs',
  m: 'size-4 rounded-sm',
  l: 'size-5 rounded-sm',
  xl: 'size-6 rounded-md',
};

/** The mark fills the box inside its 2 px border. */
const MarkSize: Record<Size, string> = {
  s: 'size-2',
  m: 'size-3',
  l: 'size-4',
  xl: 'size-5',
};

interface BoxState {
  selected: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  invalid?: boolean;
  emphasized?: boolean;
}

/**
 * The box's colours for one state. Chosen here rather than with stacked
 * variants, so checked, invalid and disabled never fight over CSS order.
 * Hover and press come from the row (`group/checkbox`).
 */
function boxTone(state: BoxState): string {
  if (state.disabled) {
    return 'border-border bg-neutral-subtle text-foreground-subtle';
  }
  if (state.readOnly) {
    return state.selected
      ? 'border-foreground-muted bg-foreground-muted text-foreground-inverse'
      : 'border-border-strong bg-surface-muted';
  }
  if (state.invalid) {
    return state.selected
      ? 'border-negative bg-negative text-negative-foreground group-hover/checkbox:border-negative-hover group-hover/checkbox:bg-negative-hover group-active/checkbox:border-negative-down group-active/checkbox:bg-negative-down'
      : 'border-negative bg-surface group-hover/checkbox:border-negative-hover group-active/checkbox:border-negative-down';
  }
  if (state.selected && state.emphasized) {
    return 'border-accent bg-accent text-accent-foreground group-hover/checkbox:border-accent-hover group-hover/checkbox:bg-accent-hover group-active/checkbox:border-accent-down group-active/checkbox:bg-accent-down';
  }
  if (state.selected) {
    return 'border-neutral bg-neutral text-neutral-foreground group-hover/checkbox:border-neutral-hover group-hover/checkbox:bg-neutral-hover group-active/checkbox:border-neutral-down group-active/checkbox:bg-neutral-down';
  }
  return 'border-border-strong bg-surface group-hover/checkbox:border-foreground-strong group-active/checkbox:border-foreground-strongest group-active/checkbox:bg-neutral-subtle';
}

export interface CheckboxProps extends FieldOptions {
  size?: Size;
  checked?: boolean;
  defaultChecked?: boolean;
  /** Shows a dash: some, but not all, of the things it stands for are checked. Wins over `checked`. */
  indeterminate?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  /** Fills a checked box with the accent colour instead of neutral, for checkboxes that should stand out. */
  emphasized?: boolean;
  /** Submitted with a plain form while checked. */
  name?: string;
  /** The value submitted while checked. Defaults to `on`. */
  value?: string;
  /** Required when there is no visible `label`. */
  'aria-label'?: string;
  class?: string;
}

/**
 * A yes/no choice that takes effect when the form is saved, or one item of a
 * set. For a setting that takes effect immediately, use Switch.
 */
export function Checkbox(props: CheckboxProps) {
  const [field] = splitProps(props, [
    'description',
    'errorText',
    'required',
    'invalid',
    'disabled',
    'readOnly',
    'id',
    'class',
  ]);
  const size = () => props.size ?? 'm';
  // A JSX label is read once: reading it again would create it twice on the server.
  const label = children(() => props.label);
  const checkedState = () =>
    props.indeterminate ? 'indeterminate' : props.checked;

  return (
    <Field {...field}>
      <ArkCheckbox.Root
        checked={checkedState()}
        defaultChecked={props.defaultChecked}
        onCheckedChange={(details) =>
          props.onCheckedChange?.(details.checked === true)
        }
        name={props.name}
        value={props.value}
        class={cn(
          ToggleRow,
          ToggleRowSize[size()],
          'group/checkbox',
          ToggleCursor({ disabled: props.disabled, readOnly: props.readOnly })
        )}
      >
        <span class={cn('flex items-start', ToggleGap[size()])}>
          <span class={cn('flex shrink-0 items-center', ToggleLine[size()])}>
            <ArkCheckbox.Context>
              {(checkbox) => (
                <ArkCheckbox.Control
                  class={cn(
                    'box-border flex items-center justify-center border-2',
                    'motion-safe:transition-colors motion-safe:duration-100 motion-safe:ease-standard',
                    BoxSize[size()],
                    ToggleFocusRing,
                    boxTone({
                      selected: checkbox().checked || checkbox().indeterminate,
                      disabled: props.disabled,
                      readOnly: props.readOnly,
                      invalid: props.invalid,
                      emphasized: props.emphasized,
                    })
                  )}
                >
                  <ArkCheckbox.Indicator>
                    <Check
                      class={cn('block', MarkSize[size()])}
                      strokeWidth={3}
                      aria-hidden='true'
                    />
                  </ArkCheckbox.Indicator>
                  <ArkCheckbox.Indicator indeterminate>
                    <Minus
                      class={cn('block', MarkSize[size()])}
                      strokeWidth={3}
                      aria-hidden='true'
                    />
                  </ArkCheckbox.Indicator>
                </ArkCheckbox.Control>
              )}
            </ArkCheckbox.Context>
          </span>
          <Show when={label()}>
            <ArkCheckbox.Label class={cn(ToggleLabel, ControlText[size()])}>
              {label()}
              <ArkField.RequiredIndicator
                class='ml-1 text-negative'
                aria-hidden='true'
              >
                *
              </ArkField.RequiredIndicator>
            </ArkCheckbox.Label>
          </Show>
        </span>
        <ArkCheckbox.HiddenInput aria-label={props['aria-label']} />
      </ArkCheckbox.Root>
    </Field>
  );
}
