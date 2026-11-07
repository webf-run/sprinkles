import { Field as ArkField } from '@ark-ui/solid/field';
import { Show, createSignal, splitProps } from 'solid-js';

import type { Size } from '../core/control';
import { InputBase } from '../core/field';
import { cn } from '../utils';
import { Field, type FieldOptions } from './Field';

/** InputSize without the fixed height: padding, text and radius at each size. */
const TextAreaSize: Record<Size, string> = {
  s: 'rounded-md px-2 py-1 text-xs',
  m: 'rounded-lg px-3 py-2 text-sm',
  l: 'rounded-lg px-3 py-2 text-base',
  xl: 'rounded-xl px-4 py-3 text-lg',
};

export interface TextAreaProps extends FieldOptions {
  size?: Size;
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  name?: string;
  placeholder?: string;
  /** Visible lines before it scrolls (or, with `autoResize`, before it grows). Defaults to 3. */
  rows?: number;
  /** Grows with its content instead of scrolling. */
  autoResize?: boolean;
  maxLength?: number;
  /** Shows "count / maxLength" under the field. Needs `maxLength`. */
  showCount?: boolean;
  /** Required when there is no visible `label`. */
  'aria-label'?: string;
  class?: string;
}

/** Multi-line plain text: an excerpt, a meta description, alt text. */
export function TextArea(props: TextAreaProps) {
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

  // Typed text, for the counter when uncontrolled.
  const [typed, setTyped] = createSignal(input.defaultValue ?? '');
  const text = () => input.value ?? typed();
  // Solid sets a textarea's `value` only after hydration, so the first text
  // also goes in as content: the server-rendered page shows it too.
  const initialText = text();

  return (
    <Field {...field}>
      <ArkField.Textarea
        name={input.name}
        value={text()}
        placeholder={input.placeholder}
        rows={input.rows ?? 3}
        maxLength={input.maxLength}
        autoresize={input.autoResize}
        aria-label={input['aria-label']}
        onInput={(event) => {
          setTyped(event.currentTarget.value);
          input.onValueChange?.(event.currentTarget.value);
        }}
        class={cn(
          InputBase,
          TextAreaSize[size()],
          'block',
          input.autoResize ? 'resize-none' : 'resize-y'
        )}
      >
        {initialText}
      </ArkField.Textarea>
      <Show when={input.showCount && input.maxLength !== undefined}>
        <span
          class='self-end text-xs text-foreground-muted tabular-nums'
          aria-hidden='true'
        >
          {text().length} / {input.maxLength}
        </span>
      </Show>
    </Field>
  );
}
