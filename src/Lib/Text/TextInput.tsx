import { Field } from '@ark-ui/solid/field';
import clsx from 'clsx';
import { type JSX, Show, splitProps } from 'solid-js';

import style from './TextInput.module.css';

export type TextInputSize = 'sm' | 'md' | 'lg';
export type TextInputVariant = 'default';

export interface TextInputProps {
  /** Field integration */
  label?: string;
  helperText?: string;
  errorMessage?: string;
  required?: boolean;

  /** State */
  disabled?: boolean;
  readOnly?: boolean;
  invalid?: boolean;

  /** Styling */
  size?: TextInputSize;
  variant?: TextInputVariant;
  class?: string;

  /** Icons */
  leftIcon?: JSX.Element;
  rightIcon?: JSX.Element;

  /** Input properties */
  type?: 'text' | 'email' | 'password' | 'search' | 'tel' | 'url';
  placeholder?: string;
  value?: string;
  name?: string;
  id?: string;
  autocomplete?: string;
  maxLength?: number;
  minLength?: number;
  pattern?: string;

  /** Events */
  onInput?: JSX.InputEventHandler<HTMLInputElement, InputEvent>;
  onChange?: JSX.ChangeEventHandler<HTMLInputElement, Event>;
  onFocus?: JSX.FocusEventHandler<HTMLInputElement, FocusEvent>;
  onBlur?: JSX.FocusEventHandler<HTMLInputElement, FocusEvent>;
  onKeyDown?: JSX.EventHandler<HTMLInputElement, KeyboardEvent>;
  onKeyUp?: JSX.EventHandler<HTMLInputElement, KeyboardEvent>;
}

export function TextInput(props: TextInputProps) {
  const [local, rest] = splitProps(props, [
    'class',
    'label',
    'helperText',
    'errorMessage',
    'required',
    'disabled',
    'readOnly',
    'invalid',
    'size',
    'variant',
    'leftIcon',
    'rightIcon',
    'type',
    'placeholder',
    'value',
    'name',
    'id',
    'autocomplete',
    'maxLength',
    'minLength',
    'pattern',
    'onInput',
    'onChange',
    'onFocus',
    'onBlur',
    'onKeyDown',
    'onKeyUp',
  ]);

  const hasLeftIcon = () => Boolean(local.leftIcon);
  const hasRightIcon = () => Boolean(local.rightIcon);
  const showError = () => local.invalid && local.errorMessage;
  const showHelper = () => !showError() && local.helperText;

  console.log(local, rest);

  return (
    <Field.Root
      class={clsx('TextInput', style.root, local.class)}
      disabled={local.disabled}
      readOnly={local.readOnly}
      invalid={local.invalid}
      required={local.required}
      data-size={local.size ?? 'md'}
      data-disabled={local.disabled}
      data-readonly={local.readOnly}
      data-invalid={local.invalid}
      data-required={local.required}
    >
      <Show when={local.label}>
        <Field.Label class={style.label}>
          {local.label}
          <Show when={local.required}>
            <Field.RequiredIndicator class={style.required}>
              *
            </Field.RequiredIndicator>
          </Show>
        </Field.Label>
      </Show>

      <div class={style.inputContainer}>
        <Show when={hasLeftIcon()}>
          <div class={style.leftIcon} aria-hidden='true'>
            {local.leftIcon}
          </div>
        </Show>

        <Field.Input
          {...rest}
          class={clsx(
            style.input,
            hasLeftIcon() && style.hasLeftIcon,
            hasRightIcon() && style.hasRightIcon
          )}
          type={local.type ?? 'text'}
          placeholder={local.placeholder}
          value={local.value}
          name={local.name}
          id={local.id}
          autocomplete={local.autocomplete}
          maxLength={local.maxLength}
          minLength={local.minLength}
          pattern={local.pattern}
          onInput={local.onInput}
          onChange={local.onChange}
          onFocus={local.onFocus}
          onBlur={local.onBlur}
          onKeyDown={local.onKeyDown}
          onKeyUp={local.onKeyUp}
          aria-invalid={local.invalid}
          aria-required={local.required}
          aria-describedby={
            showError() || showHelper()
              ? `${local.id || 'input'}-description`
              : undefined
          }
        />

        <Show when={hasRightIcon()}>
          <div class={style.rightIcon} aria-hidden='true'>
            {local.rightIcon}
          </div>
        </Show>
      </div>

      <Show when={showHelper()}>
        <Field.HelperText
          class={style.helperText}
          id={`${local.id || 'input'}-description`}
        >
          {local.helperText}
        </Field.HelperText>
      </Show>

      <Show when={showError()}>
        <Field.ErrorText
          class={style.errorText}
          id={`${local.id || 'input'}-description`}
        >
          {local.errorMessage}
        </Field.ErrorText>
      </Show>
    </Field.Root>
  );
}
