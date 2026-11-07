import { Popover as ArkPopover, usePopover } from '@ark-ui/solid/popover';
import { type JSX, Show } from 'solid-js';
import { Portal } from 'solid-js/web';

import { PopMotion } from '../core/popover';
import { cn } from '../utils';
import type { TriggerProps } from './Dialog';

type Side = 'top' | 'right' | 'bottom' | 'left';
export type PopoverPlacement = Side | `${Side}-start` | `${Side}-end`;

export interface PopoverProps {
  /** Renders the element that opens the popover: `(props) => <Button {...props}>Schedule</Button>`. */
  trigger: (props: TriggerProps) => JSX.Element;
  /** An optional heading; it also names the popover for screen readers. */
  title?: JSX.Element;
  /** The content. Pass a function to get `close`, e.g. for an “Apply” button. */
  children: JSX.Element | ((close: () => void) => JSX.Element);
  /** Where it opens, relative to the trigger. Flips when there's no room. */
  placement?: PopoverPlacement;
  /** A small arrow pointing at the trigger. */
  arrow?: boolean;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  /** Accessible name when there's no `title`. */
  'aria-label'?: string;
  class?: string;
}

/**
 * A small, non-modal panel anchored to its trigger: a quick setting, a
 * short form, details on demand. It closes on Escape or a click outside,
 * and focus returns to the trigger. For a task that needs full attention
 * use a Dialog; for a list of actions, a DropdownMenu.
 */
export function Popover(props: PopoverProps) {
  const api = usePopover(() => ({
    open: props.open,
    defaultOpen: props.defaultOpen,
    onOpenChange: (details) => props.onOpenChange?.(details.open),
    positioning: {
      placement: props.placement ?? 'bottom-start',
      gutter: props.arrow ? 12 : 8,
    },
  }));

  const close = () => api().setOpen(false);

  const content = () => {
    const children = props.children;
    return typeof children === 'function' ? children(close) : children;
  };

  return (
    <ArkPopover.RootProvider value={api} lazyMount unmountOnExit>
      <ArkPopover.Trigger
        asChild={(triggerProps) =>
          props.trigger(triggerProps() as TriggerProps)
        }
      />

      <Portal>
        <ArkPopover.Positioner>
          <ArkPopover.Content
            aria-label={props['aria-label']}
            class={cn(
              'relative z-50 box-border flex max-w-sm min-w-48 flex-col gap-2 rounded-lg border border-border-muted bg-surface p-4',
              'text-sm text-foreground shadow-overlay outline-none',
              PopMotion,
              props.class
            )}
            style={{
              'transform-origin': 'var(--transform-origin)',
              '--arrow-size': '0.75rem',
              '--arrow-background': 'var(--color-surface)',
            }}
          >
            <Show when={props.arrow}>
              <ArkPopover.Arrow>
                <ArkPopover.ArrowTip class='border-t border-l border-border-muted' />
              </ArkPopover.Arrow>
            </Show>
            <Show when={props.title}>
              <ArkPopover.Title class='m-0 text-sm font-semibold text-foreground-strongest'>
                {props.title}
              </ArkPopover.Title>
            </Show>
            {content()}
          </ArkPopover.Content>
        </ArkPopover.Positioner>
      </Portal>
    </ArkPopover.RootProvider>
  );
}
