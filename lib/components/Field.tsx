import { Field as ArkField } from '@ark-ui/solid/field';
import CircleAlert from 'lucide-solid/icons/circle-alert';
import { type JSX, Show, children } from 'solid-js';

import { ErrorText, HelperText, LabelText } from '../core/field';
import { cn } from '../utils';

/** The parts every field shares, so each input component takes the same props. */
export interface FieldOptions {
  /** Visible label. Every field needs one; use `aria-label` only where a visible label truly can't fit. */
  label?: JSX.Element;
  /** Help shown under the control; replaced by `errorText` while invalid. */
  description?: JSX.Element;
  /** Why the value is invalid. Shown, and announced, only while `invalid`. */
  errorText?: JSX.Element;
  required?: boolean;
  invalid?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  id?: string;
}

export interface FieldProps extends FieldOptions {
  class?: string;
  children: JSX.Element;
}

/**
 * Label, control, and help or error text, wired together by Ark UI's field:
 * the label points at the control, and the help or error text describes it.
 * A required field shows an asterisk; screen readers hear "required" from the
 * control itself.
 */
export function Field(props: FieldProps) {
  // Resolved once: `Show` re-reads `when` on the server, which would create
  // JSX passed in these props twice and break hydration.
  const label = children(() => props.label);
  const description = children(() => props.description);
  const errorText = children(() => props.errorText);

  return (
    <ArkField.Root
      id={props.id}
      required={props.required}
      invalid={props.invalid}
      disabled={props.disabled}
      readOnly={props.readOnly}
      class={cn('flex w-full flex-col gap-1', props.class)}
    >
      <Show when={label()}>
        <ArkField.Label class={LabelText}>
          {label()}
          <ArkField.RequiredIndicator
            class='ml-1 text-negative'
            aria-hidden='true'
          >
            *
          </ArkField.RequiredIndicator>
        </ArkField.Label>
      </Show>

      {props.children}

      <Show when={description() && !props.invalid}>
        <ArkField.HelperText class={HelperText}>
          {description()}
        </ArkField.HelperText>
      </Show>
      <Show when={errorText()}>
        <ArkField.ErrorText class={ErrorText}>
          {/* A line-high box, so the icon stays on the first line when the text wraps. */}
          <span aria-hidden='true' class='flex h-4 shrink-0 items-center'>
            <CircleAlert class='size-3' />
          </span>
          <span>{errorText()}</span>
        </ArkField.ErrorText>
      </Show>
    </ArkField.Root>
  );
}
