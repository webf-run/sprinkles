import { Field as ArkField } from '@ark-ui/solid/field';
import Search from 'lucide-solid/icons/search';
import X from 'lucide-solid/icons/x';
import { Show, createSignal, splitProps } from 'solid-js';

import {
  ControlReset,
  FocusRing,
  IconSize,
  type Size,
  Transition,
} from '../core/control';
import {
  InputBase,
  InputIconPadding,
  InputIconPosition,
  InputSize,
  InputTrailingPadding,
  TrailingButtonEnd,
  TrailingButtonSize,
} from '../core/field';
import { cn } from '../utils';
import { Field, type FieldOptions } from './Field';

export interface SearchFieldProps extends FieldOptions {
  size?: Size;
  /** The current text (controlled). */
  value?: string;
  /** The starting text (uncontrolled). */
  defaultValue?: string;
  /** Called with the new text each time it changes, including when it is cleared. */
  onValueChange?: (value: string) => void;
  /** Called with the text when the user presses Enter. */
  onSubmit?: (value: string) => void;
  /** Called when the user clears the field with the clear button or Escape. */
  onClear?: () => void;
  name?: string;
  type?: 'search' | 'text' | 'url';
  placeholder?: string;
  autocomplete?: string;
  maxLength?: number;
  minLength?: number;
  /** A regular expression the whole text must match. */
  pattern?: string;
  /** The label or icon on a phone keyboard's Enter key. Defaults to `search`. */
  enterKeyHint?:
    'enter' | 'done' | 'go' | 'next' | 'previous' | 'search' | 'send';
  inputMode?:
    | 'none'
    | 'text'
    | 'tel'
    | 'url'
    | 'email'
    | 'numeric'
    | 'decimal'
    | 'search';
  spellCheck?: boolean;
  /** Names the clear button. Defaults to "Clear search". */
  clearLabel?: string;
  'aria-label'?: string;
  class?: string;
}

/**
 * A text field for searches: a magnifier at the start, a button to clear the
 * text at the end, Enter to submit and Escape to clear. Inside a `<form>`,
 * Enter also submits the form.
 */
export function SearchField(props: SearchFieldProps) {
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

  // Controlled when `value` is given, uncontrolled otherwise.
  const [inner, setInner] = createSignal(input.defaultValue ?? '');
  const text = () => input.value ?? inner();
  const editable = () => !field.disabled && !field.readOnly;

  let el: HTMLInputElement | undefined;

  function change(next: string) {
    setInner(next);
    input.onValueChange?.(next);
  }

  function clear() {
    if (text() === '') return;
    change('');
    input.onClear?.();
    el?.focus();
  }

  return (
    <Field {...field}>
      <div class='relative flex items-center'>
        <Search
          aria-hidden='true'
          class={cn(
            'pointer-events-none absolute text-foreground-muted in-data-disabled:text-foreground-subtle',
            InputIconPosition[size()]
          )}
        />
        <ArkField.Input
          ref={el}
          name={input.name}
          type={input.type ?? 'search'}
          value={text()}
          placeholder={input.placeholder}
          autocomplete={input.autocomplete}
          maxLength={input.maxLength}
          minLength={input.minLength}
          pattern={input.pattern}
          enterkeyhint={input.enterKeyHint ?? 'search'}
          inputmode={input.inputMode}
          spellcheck={input.spellCheck}
          aria-label={input['aria-label']}
          onInput={(event) => change(event.currentTarget.value)}
          onKeyDown={(event) => {
            // Enter that confirms an IME word is not a search. Safari ends
            // the composition first, so there only keyCode 229 shows it.
            const composing = event.isComposing || event.keyCode === 229;
            if (event.key === 'Enter' && !composing) {
              input.onSubmit?.(text());
            } else if (event.key === 'Escape' && editable() && text() !== '') {
              // Keep Escape from also closing a dialog this field sits in.
              event.preventDefault();
              event.stopPropagation();
              clear();
            }
          }}
          class={cn(
            InputBase,
            InputSize[size()],
            InputIconPadding[size()],
            InputTrailingPadding[size()],
            // Without Preflight, Safari draws a native search box.
            'appearance-none',
            // The browser's own clear button would sit beside ours.
            '[&::-webkit-search-cancel-button]:hidden [&::-webkit-search-decoration]:hidden'
          )}
        />
        <Show when={editable() && text() !== ''}>
          {/* Out of the Tab order: Escape clears from the keyboard. */}
          <button
            type='button'
            tabindex='-1'
            aria-label={input.clearLabel ?? 'Clear search'}
            class={cn(
              'absolute inset-y-px right-px flex items-center justify-center border-0 bg-transparent p-0',
              ControlReset,
              'cursor-pointer text-foreground-muted hover:bg-neutral-subtle hover:text-foreground-strong active:bg-neutral/12',
              FocusRing,
              Transition,
              TrailingButtonSize[size()],
              TrailingButtonEnd[size()]
            )}
            // Keeps focus in the input, so clearing never blurs it.
            onMouseDown={(event) => event.preventDefault()}
            onClick={clear}
          >
            <X class={IconSize[size()]} aria-hidden='true' />
          </button>
        </Show>
      </div>
    </Field>
  );
}
