import { Field } from '@ark-ui/solid/field';
import {
  Select as ArkSelect,
  createListCollection,
} from '@ark-ui/solid/select';
import clsx from 'clsx';
import { Check, ChevronDown, LoaderCircle } from 'lucide-solid';
import {
  type Accessor,
  Index,
  type JSX,
  Show,
  createMemo,
  splitProps,
} from 'solid-js';
import { Portal } from 'solid-js/web';

import style from './Select.module.css';

export interface SelectItem<T = string> {
  label: string;
  value: T;
  disabled?: boolean;
  description?: string;
}

export interface SelectItemGroup<T = string> {
  label: string;
  items: SelectItem<T>[];
}

export interface SelectProps<T = string> {
  /** Data */
  value?: T;
  items?: SelectItem<T>[];
  groups?: SelectItemGroup<T>[];
  placeholder?: string;

  /** Field integration */
  label?: string;
  description?: string;
  errorMessage?: string;
  required?: boolean;

  /** State */
  disabled?: boolean;
  readOnly?: boolean;
  invalid?: boolean;
  loading?: boolean;

  /** Behavior */
  closeOnSelect?: boolean;
  positioning?: 'bottom' | 'top' | 'auto';

  /** Styling */
  class?: string;

  /** Custom rendering */
  renderItem?: (item: SelectItem<T>) => JSX.Element;
  renderValue?: (item: SelectItem<T>) => JSX.Element;

  /** Events */
  onChange?: (value: T | undefined) => void;
  onOpenChange?: (open: boolean) => void;

  /** Empty state */
  emptyText?: string;

  /** Accessibility */
  name?: string;
  id?: string;
  'aria-label'?: string;
  'aria-describedby'?: string;
}

export function Select<T = string>(props: SelectProps<T>) {
  const [local, fieldProps, rest] = splitProps(
    props,
    [
      'items',
      'groups',
      'value',
      'placeholder',
      'disabled',
      'readOnly',
      'invalid',
      'loading',
      'closeOnSelect',
      'positioning',
      'class',
      'renderItem',
      'renderValue',
      'onChange',
      'onOpenChange',
      'emptyText',
      'name',
      'id',
      'aria-label',
      'aria-describedby',
    ],
    ['label', 'description', 'errorMessage', 'required']
  );

  // Create collection from items or groups
  const collection = createMemo(() => {
    if (local.groups) {
      const allItems: SelectItem<T>[] = [];
      for (const group of local.groups) {
        allItems.push(...group.items);
      }
      return createListCollection({
        items: allItems.map((item) => ({
          ...item,
          disabled: item.disabled,
        })),
      });
    }
    return createListCollection({
      items: (local.items ?? []).map((item) => ({
        ...item,
        disabled: item.disabled,
      })),
    });
  });

  // Find item by value
  const findItemByValue = (value: T | undefined): SelectItem<T> | undefined => {
    if (value === undefined) return undefined;
    return collection().items.find((item) => item.value === value);
  };

  // Handle value changes
  const handleValueChange = (details: { value: string[] }) => {
    const newValue = details.value[0] as T | undefined;
    local.onChange?.(newValue);
  };

  // Handle open state changes
  const handleOpenChange = (details: { open: boolean }) => {
    local.onOpenChange?.(details.open);
  };

  // Convert value to array format expected by Ark UI
  const arkValue = createMemo(() => {
    return local.value !== undefined ? [String(local.value)] : [];
  });

  // Current selected item
  const selectedItem = createMemo(() => {
    return findItemByValue(local.value);
  });

  // Positioning options
  const positioningOptions = createMemo(() => {
    const base = { sameWidth: true };
    switch (local.positioning) {
      case 'top':
        return { ...base, placement: 'top' as const };
      case 'bottom':
        return { ...base, placement: 'bottom' as const };
      default:
        return base;
    }
  });

  // Check if we have any items to display
  const hasItems = createMemo(() => {
    if (local.groups) {
      return local.groups.some((group) => group.items.length > 0);
    }
    return (local.items?.length ?? 0) > 0;
  });

  // Default render functions
  const defaultRenderItem = (item: SelectItem<T>) => (
    <>
      <ArkSelect.ItemText class={style.itemText}>
        {item.label}
      </ArkSelect.ItemText>
      <ArkSelect.ItemIndicator class={style.itemIndicator}>
        <Check size={16} />
      </ArkSelect.ItemIndicator>
    </>
  );

  const defaultRenderValue = (item: SelectItem<T>) => item.label;

  const renderItem = local.renderItem ?? defaultRenderItem;
  const renderValue = local.renderValue ?? defaultRenderValue;

  return (
    <Field.Root
      {...fieldProps}
      invalid={local.invalid}
      disabled={local.disabled}
      required={fieldProps.required}
      {...rest}
    >
      <ArkSelect.Root
        collection={collection()}
        value={arkValue()}
        onValueChange={handleValueChange}
        onOpenChange={handleOpenChange}
        disabled={local.disabled || local.loading}
        readOnly={local.readOnly}
        invalid={local.invalid}
        closeOnSelect={local.closeOnSelect ?? true}
        positioning={positioningOptions()}
        name={local.name}
        id={local.id}
        aria-label={local['aria-label']}
        aria-describedby={local['aria-describedby']}
        class={clsx(style.select, local.class)}
      >
        <Show when={fieldProps.label}>
          <ArkSelect.Label class={style.label}>
            {fieldProps.label}
            <Show when={fieldProps.required}> *</Show>
          </ArkSelect.Label>
        </Show>
        <ArkSelect.Control
          class={clsx(style.control, {
            [style.loading]: local.loading,
          })}
        >
          <ArkSelect.Trigger class={style.trigger}>
            <ArkSelect.ValueText
              class={style.valueText}
              placeholder={local.placeholder}
            >
              <Show when={selectedItem()} fallback={local.placeholder}>
                {(item: Accessor<SelectItem<T>>) => renderValue(item())}
              </Show>
            </ArkSelect.ValueText>

            <Show
              when={local.loading}
              fallback={
                <ArkSelect.Indicator class={style.indicator}>
                  <ChevronDown size={16} />
                </ArkSelect.Indicator>
              }
            >
              <div class={style.loadingIndicator}>
                <LoaderCircle size={16} />
              </div>
            </Show>
          </ArkSelect.Trigger>
        </ArkSelect.Control>

        <Portal>
          <ArkSelect.Positioner class={style.positioner}>
            <ArkSelect.Content class={style.content}>
              <ArkSelect.List class={style.list}>
                <Show
                  when={hasItems()}
                  fallback={
                    <div class={style.emptyState}>
                      {local.emptyText ?? 'No options available'}
                    </div>
                  }
                >
                  <Show
                    when={local.groups}
                    fallback={
                      <Index each={local.items ?? []}>
                        {(item) => (
                          <ArkSelect.Item item={item()} class={style.item}>
                            {renderItem(item())}
                          </ArkSelect.Item>
                        )}
                      </Index>
                    }
                  >
                    <Index each={local.groups!}>
                      {(group) => (
                        <ArkSelect.ItemGroup class={style.itemGroup}>
                          <ArkSelect.ItemGroupLabel
                            class={style.itemGroupLabel}
                          >
                            {group().label}
                          </ArkSelect.ItemGroupLabel>
                          <Index each={group().items}>
                            {(item) => (
                              <ArkSelect.Item item={item()} class={style.item}>
                                {renderItem(item())}
                              </ArkSelect.Item>
                            )}
                          </Index>
                        </ArkSelect.ItemGroup>
                      )}
                    </Index>
                  </Show>
                </Show>
              </ArkSelect.List>
            </ArkSelect.Content>
          </ArkSelect.Positioner>
        </Portal>

        <ArkSelect.HiddenSelect />
      </ArkSelect.Root>

      <Show when={fieldProps.description && !fieldProps.errorMessage}>
        <Field.HelperText>{fieldProps.description}</Field.HelperText>
      </Show>

      <Show when={fieldProps.errorMessage}>
        <Field.ErrorText>{fieldProps.errorMessage}</Field.ErrorText>
      </Show>
    </Field.Root>
  );
}
