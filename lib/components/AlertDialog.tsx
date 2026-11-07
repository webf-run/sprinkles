import { type JSX, Show, createSignal } from 'solid-js';

import { Button } from './Button';
import { Dialog, type TriggerProps } from './Dialog';

export type AlertDialogVariant = 'confirmation' | 'destructive';

export interface AlertDialogProps {
  /** A question or a statement of what will happen: “Delete this image?” */
  title: JSX.Element;
  /** The message: what happens and whether it can be undone. */
  children: JSX.Element;
  /** `destructive` makes the confirm button negative and focuses Cancel first. */
  variant?: AlertDialogVariant;
  /** A verb that repeats the action: “Delete”, “Publish”. Never “OK”. */
  confirmLabel: string;
  cancelLabel?: string;
  /**
   * Runs on confirm. Return a promise to show the pending state until it
   * settles: the dialog closes when it resolves and stays open when it rejects.
   */
  onConfirm: () => unknown;
  onCancel?: () => void;
  /** A third choice, such as “Reload” in an edit conflict. */
  secondaryLabel?: string;
  onSecondary?: () => void;
  /** Shows the pending state for an action you track yourself. */
  pending?: boolean;
  /** Defaults to `s`, or `m` with a secondary action so three buttons fit. */
  size?: 's' | 'm';
  trigger?: (props: TriggerProps) => JSX.Element;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  class?: string;
}

function isPromiseLike(value: unknown): value is PromiseLike<unknown> {
  return (
    typeof (value as PromiseLike<unknown> | undefined)?.then === 'function'
  );
}

/**
 * A confirmation that interrupts: delete media, publish a page, resolve an
 * edit conflict. Announced as an `alertdialog`; it closes only through its
 * buttons or Escape, never by a click outside. While the confirm action
 * runs, the buttons are pending and the dialog can't be dismissed.
 */
export function AlertDialog(props: AlertDialogProps) {
  const [running, setRunning] = createSignal(false);
  const pending = () => Boolean(props.pending) || running();
  const destructive = () => props.variant === 'destructive';

  const confirm = async (close: () => void) => {
    const result = props.onConfirm();
    if (!isPromiseLike(result)) {
      closeByButton(close);
      return;
    }

    setRunning(true);
    try {
      await result;
      closeByButton(close);
    } catch {
      // Stay open so the person can retry or cancel; the app reports the error.
    } finally {
      setRunning(false);
    }
  };

  // Set when one of the buttons closes the dialog, so Escape alone counts as cancel.
  let closedByButton = false;
  const closeByButton = (close: () => void) => {
    closedByButton = true;
    close();
  };

  const onOpenChange = (open: boolean) => {
    if (!open && !closedByButton) props.onCancel?.();
    closedByButton = false;
    props.onOpenChange?.(open);
  };

  return (
    <Dialog
      role='alertdialog'
      title={props.title}
      size={props.size ?? (props.secondaryLabel ? 'm' : 's')}
      trigger={props.trigger}
      open={props.open}
      defaultOpen={props.defaultOpen}
      onOpenChange={onOpenChange}
      dismissable={false}
      // Escape is ignored, like the buttons, while the action runs.
      closeOnEscape={!pending()}
      closeOnInteractOutside={false}
      class={props.class}
      footer={(close) => (
        <>
          <Show when={props.secondaryLabel}>
            <Button
              variant='secondary'
              fillStyle='outline'
              disabled={pending()}
              onClick={() => {
                props.onSecondary?.();
                closeByButton(close);
              }}
            >
              {props.secondaryLabel}
            </Button>
          </Show>
          <Button
            variant='secondary'
            fillStyle='outline'
            disabled={pending()}
            onClick={() => {
              props.onCancel?.();
              closeByButton(close);
            }}
            data-autofocus={destructive() || undefined}
          >
            {props.cancelLabel ?? 'Cancel'}
          </Button>
          <Button
            variant={destructive() ? 'negative' : 'accent'}
            pending={pending()}
            onClick={() => confirm(close)}
            data-autofocus={!destructive() || undefined}
          >
            {props.confirmLabel}
          </Button>
        </>
      )}
    >
      {props.children}
    </Dialog>
  );
}
