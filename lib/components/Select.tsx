import {
  Select as ArkSelect,
  createListCollection,
} from '@ark-ui/solid/select';
import Check from 'lucide-solid/icons/check';
import ChevronDown from 'lucide-solid/icons/chevron-down';
import { For, type JSX, createMemo, splitProps } from 'solid-js';
import { Portal } from 'solid-js/web';

import { IconSize, type Size } from '../core/control';
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

/** One option of a Select or Combobox. */
export interface SelectItem {
  label: string;
  value: string;
  disabled?: boolean;
}

/**
 * InputBase's `read-only:` look would always match a `<button>` (buttons are
 * never editable), so the trigger swaps it for Ark's `data-readonly`.
 */
const TriggerReset =
  'flex cursor-pointer items-center gap-2 py-0 text-left read-only:border-border-strong read-only:bg-surface data-readonly:cursor-default data-readonly:border-border data-readonly:bg-surface-muted';

interface SelectBaseProps extends FieldOptions {
  items: SelectItem[];
  size?: Size;
  /** Shown while nothing is selected. */
  placeholder?: string;
  /** Submits the selected value (or values) with a plain form. */
  name?: string;
  /** Shown in the list when `items` is empty. */
  emptyText?: JSX.Element;
  /** Required when there is no visible `label`. */
  'aria-label'?: string;
  class?: string;
}

export interface SingleSelectProps extends SelectBaseProps {
  multiple?: false;
  value?: string | null;
  defaultValue?: string | null;
  onValueChange?: (value: string | null) => void;
}

export interface MultipleSelectProps extends SelectBaseProps {
  /** Lets people pick more than one option; the list stays open between picks. */
  multiple: true;
  value?: string[];
  defaultValue?: string[];
  onValueChange?: (value: string[]) => void;
}

export type SelectProps = SingleSelectProps | MultipleSelectProps;

/** Ark keeps every selection as a list; `null` is an empty one. */
function toList(
  value: string | string[] | null | undefined
): string[] | undefined {
  if (value === undefined) return undefined;
  if (value === null) return [];
  return Array.isArray(value) ? value : [value];
}

/**
 * Picks one option, or several with `multiple`, from a short list. The
 * trigger looks like the other inputs; the options open in a popover.
 */
export function Select(props: SelectProps) {
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
  const collection = createMemo(() =>
    createListCollection({ items: props.items })
  );

  const handleValueChange = (value: string[]) => {
    if (props.multiple) {
      props.onValueChange?.(value);
    } else {
      props.onValueChange?.(value[0] ?? null);
    }
  };

  return (
    <Field {...field}>
      <ArkSelect.Root
        collection={collection()}
        multiple={props.multiple}
        value={toList(props.value)}
        defaultValue={toList(props.defaultValue)}
        onValueChange={(details) => handleValueChange(details.value)}
        name={props.name}
        positioning={{ placement: 'bottom-start', sameWidth: true, gutter: 4 }}
        lazyMount
        unmountOnExit
        class='w-full'
      >
        <ArkSelect.Control>
          <ArkSelect.Trigger
            aria-label={props['aria-label']}
            class={cn(
              InputBase,
              InputSize[size()],
              TriggerReset,
              'group/trigger'
            )}
          >
            <ArkSelect.ValueText
              placeholder={props.placeholder}
              class='min-w-0 flex-1 truncate group-data-placeholder-shown/trigger:text-foreground-subtle'
            />
            <ArkSelect.Indicator class='flex shrink-0 text-foreground-muted group-disabled/trigger:text-foreground-subtle'>
              <ChevronDown class={IconSize[size()]} aria-hidden='true' />
            </ArkSelect.Indicator>
          </ArkSelect.Trigger>
        </ArkSelect.Control>

        <Portal>
          <ArkSelect.Positioner>
            <ArkSelect.Content class={PopoverSurface}>
              <ArkSelect.List class={ListBox}>
                <For
                  each={props.items}
                  fallback={
                    <div class={ListEmpty[size()]}>
                      {props.emptyText ?? 'No options'}
                    </div>
                  }
                >
                  {(item) => (
                    <ArkSelect.Item
                      item={item}
                      class={cn(ListItem, ListItemSize[size()])}
                    >
                      <ArkSelect.ItemText class='min-w-0 flex-1 truncate'>
                        {item.label}
                      </ArkSelect.ItemText>
                      <ArkSelect.ItemIndicator class='shrink-0 text-accent'>
                        <Check
                          class={cn('block', IconSize[size()])}
                          aria-hidden='true'
                        />
                      </ArkSelect.ItemIndicator>
                    </ArkSelect.Item>
                  )}
                </For>
              </ArkSelect.List>
            </ArkSelect.Content>
          </ArkSelect.Positioner>
        </Portal>

        <ArkSelect.HiddenSelect />
      </ArkSelect.Root>
    </Field>
  );
}
