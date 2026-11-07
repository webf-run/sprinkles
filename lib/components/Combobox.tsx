import {
  Combobox as ArkCombobox,
  createListCollection,
} from '@ark-ui/solid/combobox';
import Check from 'lucide-solid/icons/check';
import ChevronDown from 'lucide-solid/icons/chevron-down';
import { For, type JSX, createMemo, createSignal, splitProps } from 'solid-js';
import { Portal } from 'solid-js/web';

import {
  ControlReset,
  Disabled,
  IconSize,
  type Size,
  Transition,
} from '../core/control';
import { InputBase, InputSize } from '../core/field';
import {
  ListBox,
  ListEmpty,
  ListItem,
  ListItemSize,
  PopoverSurface,
} from '../core/popover';
import { cn } from '../utils';
import { Field, type FieldOptions } from './Field';
import type { SelectItem } from './Select';

/** Room at the end of an input for one trailing button (chevron, calendar). */
export const InputTrailingPadding: Record<Size, string> = {
  s: 'pr-6',
  m: 'pr-8',
  l: 'pr-10',
  xl: 'pr-12',
};

/** A square, borderless icon button inside the end of an input. */
export const TrailingButton = [
  'absolute inset-y-0 right-0 flex items-center justify-center border-0 bg-transparent p-0',
  ControlReset,
  'cursor-pointer text-foreground-muted hover:text-foreground-strong',
  'disabled:text-foreground-subtle data-readonly:cursor-default',
  Disabled,
  Transition,
].join(' ');

export const TrailingButtonSize: Record<Size, string> = {
  s: 'w-6',
  m: 'w-8',
  l: 'w-10',
  xl: 'w-12',
};

export interface ComboboxProps extends FieldOptions {
  items: SelectItem[];
  size?: Size;
  value?: string | null;
  defaultValue?: string | null;
  onValueChange?: (value: string | null) => void;
  /** Called as people type; use it to load matching items from a server. */
  onInputValueChange?: (text: string) => void;
  placeholder?: string;
  /** Submits the selected item's value (not its label) with a plain form. */
  name?: string;
  /** Shown when nothing matches what was typed. */
  emptyText?: JSX.Element;
  /** Required when there is no visible `label`. */
  'aria-label'?: string;
  class?: string;
}

/** Case- and accent-insensitive "contains", so "jose" finds "José". */
function normalise(text: string): string {
  return text
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .toLocaleLowerCase();
}

/**
 * A text input that filters a long list of options as people type: authors,
 * tags, categories. For a short list, use Select.
 */
export function Combobox(props: ComboboxProps) {
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

  // What people have typed; cleared when the input shows a selection instead.
  const [query, setQuery] = createSignal('');
  // The selection, kept for the hidden form input when uncontrolled.
  const [selected, setSelected] = createSignal(props.defaultValue ?? null);
  const current = () => (props.value !== undefined ? props.value : selected());

  const matches = createMemo(() => {
    const text = normalise(query().trim());
    if (text === '') return props.items;
    return props.items.filter((item) => normalise(item.label).includes(text));
  });
  const collection = createMemo(() =>
    createListCollection({ items: matches() })
  );

  const toList = (value: string | null | undefined) =>
    value === undefined ? undefined : value === null ? [] : [value];

  return (
    <Field {...field}>
      <ArkCombobox.Root
        collection={collection()}
        value={toList(props.value)}
        defaultValue={toList(props.defaultValue)}
        onValueChange={(details) => {
          const value = details.value[0] ?? null;
          setSelected(value);
          props.onValueChange?.(value);
        }}
        onInputValueChange={(details) => {
          setQuery(details.reason === 'input-change' ? details.inputValue : '');
          props.onInputValueChange?.(details.inputValue);
        }}
        onOpenChange={(details) => {
          // Reopening shows every option again, not just the last search.
          if (details.open && details.reason !== 'input-change') setQuery('');
        }}
        placeholder={props.placeholder}
        openOnClick
        positioning={{ placement: 'bottom-start', sameWidth: true, gutter: 4 }}
        lazyMount
        unmountOnExit
        class='w-full'
      >
        <ArkCombobox.Control class='group/control relative flex items-center'>
          <ArkCombobox.Input
            aria-label={props['aria-label']}
            class={cn(
              InputBase,
              InputSize[size()],
              InputTrailingPadding[size()],
              'group-hover/control:border-foreground-muted'
            )}
          />
          <ArkCombobox.Trigger
            disabled={props.disabled || props.readOnly}
            class={cn(TrailingButton, TrailingButtonSize[size()])}
          >
            <ChevronDown class={IconSize[size()]} aria-hidden='true' />
          </ArkCombobox.Trigger>
        </ArkCombobox.Control>

        <Portal>
          <ArkCombobox.Positioner>
            <ArkCombobox.Content class={PopoverSurface}>
              <ArkCombobox.List class={ListBox}>
                <For
                  each={matches()}
                  fallback={
                    <div class={ListEmpty[size()]}>
                      {props.emptyText ?? 'No results'}
                    </div>
                  }
                >
                  {(item) => (
                    <ArkCombobox.Item
                      item={item}
                      class={cn(ListItem, ListItemSize[size()])}
                    >
                      <ArkCombobox.ItemText class='min-w-0 flex-1 truncate'>
                        {item.label}
                      </ArkCombobox.ItemText>
                      <ArkCombobox.ItemIndicator class='shrink-0 text-accent'>
                        <Check
                          class={cn('block', IconSize[size()])}
                          aria-hidden='true'
                        />
                      </ArkCombobox.ItemIndicator>
                    </ArkCombobox.Item>
                  )}
                </For>
              </ArkCombobox.List>
            </ArkCombobox.Content>
          </ArkCombobox.Positioner>
        </Portal>
      </ArkCombobox.Root>
      <input
        type='hidden'
        name={props.name}
        value={current() ?? ''}
        disabled={props.disabled}
      />
    </Field>
  );
}
