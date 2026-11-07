import { Field as ArkField } from '@ark-ui/solid/field';
import { type Component, Show, splitProps } from 'solid-js';
import { Dynamic } from 'solid-js/web';

import type { Size } from '../core/control';
import {
  InputBase,
  InputIconPadding,
  InputIconPosition,
  InputSize,
} from '../core/field';
import { cn } from '../utils';
import { Field, type FieldOptions } from './Field';

export interface TextFieldProps extends FieldOptions {
  size?: Size;
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  name?: string;
  type?: 'text' | 'email' | 'url' | 'tel' | 'search' | 'password';
  placeholder?: string;
  autocomplete?: string;
  maxLength?: number;
  /** A leading icon (a lucide-solid icon), e.g. a search glass. */
  icon?: Component<{ class?: string; 'aria-hidden'?: boolean | 'true' }>;
  'aria-label'?: string;
  class?: string;
}

/** A single-line text input with its label, help and error text. */
export function TextField(props: TextFieldProps) {
  const [field, input] = splitProps(props, [
    'label',
    'description',
    'errorText',
    'required',
    'invalid',
    'disabled',
    'readOnly',
    'id',
    'class',
  ]);
  const size = () => input.size ?? 'm';

  return (
    <Field {...field}>
      <div class='relative flex items-center'>
        <Show when={input.icon}>
          {(icon) => (
            <Dynamic
              component={icon()}
              aria-hidden='true'
              class={cn(
                'pointer-events-none absolute text-foreground-muted',
                InputIconPosition[size()]
              )}
            />
          )}
        </Show>
        <ArkField.Input
          name={input.name}
          type={input.type ?? 'text'}
          value={input.value ?? input.defaultValue ?? ''}
          placeholder={input.placeholder}
          autocomplete={input.autocomplete}
          maxLength={input.maxLength}
          aria-label={input['aria-label']}
          onInput={(event) => input.onValueChange?.(event.currentTarget.value)}
          class={cn(
            InputBase,
            InputSize[size()],
            input.icon && InputIconPadding[size()]
          )}
        />
      </div>
    </Field>
  );
}
