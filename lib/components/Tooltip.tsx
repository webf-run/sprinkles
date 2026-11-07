import { Tooltip as ArkTooltip } from '@ark-ui/solid/tooltip';
import type { JSX } from 'solid-js';
import { Portal } from 'solid-js/web';

import { cn } from '../utils';
import type { TriggerProps } from './Dialog';

type Side = 'top' | 'right' | 'bottom' | 'left';
export type TooltipPlacement = Side | `${Side}-start` | `${Side}-end`;

export interface TooltipProps {
  /** Short text: a label or a hint. No links or buttons; they can't be reached. */
  content: JSX.Element;
  /** Renders the element it describes: `(props) => <IconButton {...props} … />`. */
  trigger: (props: TriggerProps) => JSX.Element;
  placement?: TooltipPlacement;
  /** Milliseconds of hover before it opens. Keyboard focus opens it at once. */
  openDelay?: number;
  closeDelay?: number;
  disabled?: boolean;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  class?: string;
}

/** Fades in after the delay; Ark keeps it mounted until the fade-out ends. */
const Fade =
  'motion-safe:state-open:animate-fade-in motion-safe:state-closed:animate-fade-out';

/**
 * A short label shown on hover and keyboard focus: the name of an icon
 * button, the full text of a truncated title. It describes; it never holds
 * the only copy of important information, since touch screens can't hover.
 */
export function Tooltip(props: TooltipProps) {
  return (
    <ArkTooltip.Root
      open={props.open}
      defaultOpen={props.defaultOpen}
      onOpenChange={(details) => props.onOpenChange?.(details.open)}
      openDelay={props.openDelay ?? 500}
      closeDelay={props.closeDelay ?? 100}
      disabled={props.disabled}
      positioning={{ placement: props.placement ?? 'top', gutter: 8 }}
      lazyMount
      unmountOnExit
    >
      <ArkTooltip.Trigger
        asChild={(triggerProps) =>
          props.trigger(triggerProps() as TriggerProps)
        }
      />

      <Portal>
        <ArkTooltip.Positioner>
          <ArkTooltip.Content
            class={cn(
              'relative z-50 box-border max-w-xs rounded-md bg-neutral px-2 py-1 text-xs leading-4 font-medium text-neutral-foreground',
              Fade,
              props.class
            )}
            style={{
              '--arrow-size': '0.5rem',
              '--arrow-background': 'var(--color-neutral)',
            }}
          >
            <ArkTooltip.Arrow>
              <ArkTooltip.ArrowTip />
            </ArkTooltip.Arrow>
            {props.content}
          </ArkTooltip.Content>
        </ArkTooltip.Positioner>
      </Portal>
    </ArkTooltip.Root>
  );
}
