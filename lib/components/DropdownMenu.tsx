import { Menu as ArkMenu } from '@ark-ui/solid/menu';
import { type Component, For, type JSX, Match, Show, Switch } from 'solid-js';
import { Dynamic, Portal } from 'solid-js/web';

import { Transition } from '../core/control';
import { PopMotion } from '../core/popover';
import { cn } from '../utils';
import type { TriggerProps } from './Dialog';

type IconComponent = Component<{
  class?: string;
  'aria-hidden'?: boolean | 'true';
}>;

type Side = 'top' | 'right' | 'bottom' | 'left';
export type DropdownMenuPlacement = Side | `${Side}-start` | `${Side}-end`;

/** An action in the menu. */
export interface DropdownMenuItem {
  type?: 'item';
  /** Passed to `onSelect`; unique within the menu. */
  value: string;
  label: JSX.Element;
  /** A lucide-solid icon before the label. */
  icon?: IconComponent;
  /** A keyboard shortcut to show, such as `⌘D`. Display only: bind it yourself. */
  shortcut?: string;
  /** Destructive: negative colour. */
  negative?: boolean;
  disabled?: boolean;
  /** Runs when this item is chosen, before the menu's `onSelect`. */
  onSelect?: () => void;
}

/** A line between groups of items. */
export interface DropdownMenuSeparator {
  type: 'separator';
}

/** Items under an optional label. */
export interface DropdownMenuGroup {
  type: 'group';
  label?: JSX.Element;
  items: DropdownMenuItem[];
}

export type DropdownMenuEntry =
  DropdownMenuItem | DropdownMenuSeparator | DropdownMenuGroup;

export interface DropdownMenuProps {
  /** Renders the button that opens the menu: `(props) => <Button {...props}>Actions</Button>`. */
  trigger: (props: TriggerProps) => JSX.Element;
  items: DropdownMenuEntry[];
  /** Called with the chosen item's `value`. */
  onSelect?: (value: string) => void;
  placement?: DropdownMenuPlacement;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  class?: string;
}

/** Highlighted by pointer or arrow keys, darker while pressed. */
const Item = [
  'flex min-h-8 cursor-pointer items-center gap-2 rounded-md px-2 py-1 text-sm outline-none select-none',
  'data-disabled:cursor-not-allowed data-disabled:text-foreground-subtle',
  Transition,
].join(' ');

const ItemTone = {
  default:
    'text-foreground-strong data-highlighted:bg-neutral-subtle data-highlighted:active:bg-neutral/12',
  negative:
    'text-negative data-highlighted:bg-negative-subtle data-highlighted:active:bg-negative/16',
};

function MenuItem(props: { item: DropdownMenuItem }) {
  return (
    <ArkMenu.Item
      value={props.item.value}
      valueText={
        typeof props.item.label === 'string' ? props.item.label : undefined
      }
      disabled={props.item.disabled}
      onSelect={props.item.onSelect}
      class={cn(
        Item,
        props.item.negative ? ItemTone.negative : ItemTone.default
      )}
    >
      <Show when={props.item.icon}>
        {(icon) => (
          <Dynamic
            component={icon()}
            aria-hidden='true'
            class={cn(
              'size-4 shrink-0',
              !props.item.negative &&
                !props.item.disabled &&
                'text-foreground-muted'
            )}
          />
        )}
      </Show>
      <ArkMenu.ItemText class='min-w-0 flex-1 truncate'>
        {props.item.label}
      </ArkMenu.ItemText>
      <Show when={props.item.shortcut}>
        <span class='ml-4 shrink-0 text-xs text-foreground-subtle'>
          {props.item.shortcut}
        </span>
      </Show>
    </ArkMenu.Item>
  );
}

/**
 * A list of actions behind a button: page actions in a toolbar, row
 * actions in a table. Arrow keys move through the items, typing jumps to
 * one, Enter chooses it. For choosing a value in a form, use Select.
 */
export function DropdownMenu(props: DropdownMenuProps) {
  return (
    <ArkMenu.Root
      open={props.open}
      defaultOpen={props.defaultOpen}
      onOpenChange={(details) => props.onOpenChange?.(details.open)}
      onSelect={(details) => props.onSelect?.(details.value)}
      positioning={{ placement: props.placement ?? 'bottom-start', gutter: 4 }}
      lazyMount
      unmountOnExit
    >
      <ArkMenu.Trigger
        asChild={(triggerProps) =>
          props.trigger(triggerProps() as TriggerProps)
        }
      />

      <Portal>
        <ArkMenu.Positioner>
          <ArkMenu.Content
            class={cn(
              'z-50 box-border flex max-h-96 min-w-48 flex-col gap-px overflow-y-auto rounded-lg border border-border-muted bg-surface p-1',
              'text-foreground-strong shadow-overlay outline-none',
              PopMotion,
              props.class
            )}
            style={{ 'transform-origin': 'var(--transform-origin)' }}
          >
            <For each={props.items}>
              {(entry) => (
                <Switch
                  fallback={<MenuItem item={entry as DropdownMenuItem} />}
                >
                  <Match when={entry.type === 'separator'}>
                    <ArkMenu.Separator class='mx-0 my-1 h-px shrink-0 border-0 bg-border-muted' />
                  </Match>
                  <Match when={entry.type === 'group' && entry}>
                    {(group) => (
                      <ArkMenu.ItemGroup class='flex flex-col gap-px'>
                        <Show when={group().label}>
                          <ArkMenu.ItemGroupLabel class='px-2 pt-2 pb-1 text-xs font-semibold text-foreground-muted'>
                            {group().label}
                          </ArkMenu.ItemGroupLabel>
                        </Show>
                        <For each={group().items}>
                          {(item) => <MenuItem item={item} />}
                        </For>
                      </ArkMenu.ItemGroup>
                    )}
                  </Match>
                </Switch>
              )}
            </For>
          </ArkMenu.Content>
        </ArkMenu.Positioner>
      </Portal>
    </ArkMenu.Root>
  );
}
