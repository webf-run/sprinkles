import { useLocaleContext } from '@ark-ui/solid/locale';
import { NumberInput as ArkNumberInput } from '@ark-ui/solid/number-input';
import Minus from 'lucide-solid/icons/minus';
import Plus from 'lucide-solid/icons/plus';
import { Show, createEffect, createSignal, on, splitProps } from 'solid-js';

import {
  ControlReset,
  Disabled,
  IconSize,
  type Size,
  Transition,
} from '../core/control';
import { InputBase, InputSize } from '../core/field';
import { cn } from '../utils';
import { Field, type FieldOptions } from './Field';

/** Room for the two stepper buttons, plus the input's own padding. */
const StepperPadding: Record<Size, string> = {
  s: 'pr-14',
  m: 'pr-19',
  l: 'pr-23',
  xl: 'pr-28',
};

/** Each stepper is as wide as the control is tall. */
const StepperWidth: Record<Size, string> = {
  s: 'w-6',
  m: 'w-8',
  l: 'w-10',
  xl: 'w-12',
};

/** The last stepper follows the input's rounded end. */
const StepperEnd: Record<Size, string> = {
  s: 'rounded-r-md',
  m: 'rounded-r-lg',
  l: 'rounded-r-lg',
  xl: 'rounded-r-xl',
};

const Stepper = [
  'flex items-center justify-center border-0 border-l border-solid border-border bg-transparent p-0',
  ControlReset,
  'cursor-pointer text-foreground-muted hover:bg-neutral-subtle hover:text-foreground-strong active:bg-neutral/12',
  'disabled:bg-transparent disabled:text-foreground-subtle',
  Disabled,
  Transition,
].join(' ');

export interface NumberInputProps extends FieldOptions {
  size?: Size;
  /** `null` is an empty field. */
  value?: number | null;
  defaultValue?: number | null;
  onValueChange?: (value: number | null) => void;
  min?: number;
  max?: number;
  /** How much the steppers and arrow keys change the value. Defaults to 1. */
  step?: number;
  /** How the value is shown when the field isn't being edited: currency, percent, decimals. */
  formatOptions?: Intl.NumberFormatOptions;
  placeholder?: string;
  /** Submits the plain number (not the formatted text) with a plain form. */
  name?: string;
  /** Required when there is no visible `label`. */
  'aria-label'?: string;
  class?: string;
}

/** The plain number, for the hidden form input. */
const toPlainText = (value: number | null | undefined) =>
  value === null || value === undefined || Number.isNaN(value)
    ? ''
    : String(value);

/**
 * A number with stepper buttons: a sort order, a price, a word limit. Arrow
 * keys step by `step`, Page Up and Down by ten steps.
 */
export function NumberInput(props: NumberInputProps) {
  const [field] = splitProps(props, [
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
  const size = () => props.size ?? 'm';
  const locale = useLocaleContext();
  const initial = props.value !== undefined ? props.value : props.defaultValue;

  // Ark parses its text with `formatOptions`, so a number from outside is
  // formatted first: with `style: 'percent'`, 0.15 must reach it as "15%".
  const toText = (value: number | null | undefined) => {
    if (value === null || value === undefined || Number.isNaN(value)) return '';
    if (!props.formatOptions) return String(value);
    return new Intl.NumberFormat(locale().locale, props.formatOptions).format(
      value
    );
  };

  // Ark edits text ("1." on the way to "1.5"), the app wants a number. Keep
  // the text here and follow a controlled `value` only when the number differs,
  // so a parent echoing the value back never interrupts typing.
  const [text, setText] = createSignal(toText(initial));
  const [number, setNumber] = createSignal<number | null>(initial ?? null);
  createEffect(
    on(
      () => props.value,
      (value) => {
        if (value === undefined || value === number()) return;
        setNumber(value);
        setText(toText(value));
      },
      { defer: true }
    )
  );

  return (
    <Field {...field}>
      <ArkNumberInput.Root
        value={text()}
        onValueChange={(details) => {
          const value = Number.isNaN(details.valueAsNumber)
            ? null
            : details.valueAsNumber;
          setText(details.value);
          setNumber(value);
          props.onValueChange?.(value);
        }}
        min={props.min}
        max={props.max}
        step={props.step}
        formatOptions={props.formatOptions}
        class='w-full'
      >
        <ArkNumberInput.Control class='relative flex items-center'>
          <ArkNumberInput.Input
            placeholder={props.placeholder}
            aria-label={props['aria-label']}
            class={cn(
              InputBase,
              InputSize[size()],
              !props.readOnly && StepperPadding[size()]
            )}
          />
          <Show when={!props.readOnly}>
            <div class='absolute inset-y-px right-px flex'>
              <ArkNumberInput.DecrementTrigger
                class={cn(Stepper, StepperWidth[size()])}
              >
                <Minus class={IconSize[size()]} aria-hidden='true' />
              </ArkNumberInput.DecrementTrigger>
              <ArkNumberInput.IncrementTrigger
                class={cn(Stepper, StepperWidth[size()], StepperEnd[size()])}
              >
                <Plus class={IconSize[size()]} aria-hidden='true' />
              </ArkNumberInput.IncrementTrigger>
            </div>
          </Show>
        </ArkNumberInput.Control>
      </ArkNumberInput.Root>
      <input
        type='hidden'
        name={props.name}
        value={toPlainText(number())}
        disabled={props.disabled}
      />
    </Field>
  );
}
