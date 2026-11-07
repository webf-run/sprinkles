import { Dialog as ArkDialog, useDialog } from '@ark-ui/solid/dialog';
import X from 'lucide-solid/icons/x';
import { type JSX, Show } from 'solid-js';
import { Portal } from 'solid-js/web';

import { cn } from '../utils';
import { IconButton } from './IconButton';

export type DialogSize = 's' | 'm' | 'l';

/**
 * Props Ark puts on a trigger (id, ARIA state, event handlers): spread them
 * on a Button or IconButton. Ark sets `aria-expanded` and `aria-haspopup` as
 * booleans and role names, so they're typed the way Button takes them.
 */
export type TriggerProps = Omit<
  JSX.HTMLAttributes<HTMLElement>,
  'aria-expanded' | 'aria-haspopup' | 'ref'
> & {
  'aria-expanded'?: boolean;
  'aria-haspopup'?: boolean | 'menu' | 'dialog' | 'listbox';
};

export interface DialogProps {
  /** Names the dialog; read first by screen readers. */
  title: JSX.Element;
  /** One or two sentences under the title. */
  description?: JSX.Element;
  /** The body. It scrolls when the dialog is taller than the screen. */
  children?: JSX.Element;
  /** Actions at the bottom, usually Buttons. Pass a function to get `close`. */
  footer?: JSX.Element | ((close: () => void) => JSX.Element);
  /** Maximum width: `s` 384 px, `m` 512 px, `l` 672 px. */
  size?: DialogSize;
  /** Renders the element that opens the dialog: `(props) => <Button {...props}>Edit</Button>`. */
  trigger?: (props: TriggerProps) => JSX.Element;
  /** Controlled open state; pair it with `onOpenChange`. */
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  /** Shows the close button in the corner. */
  dismissable?: boolean;
  closeOnEscape?: boolean;
  closeOnInteractOutside?: boolean;
  /** `alertdialog` for messages that need a decision; see AlertDialog. */
  role?: 'dialog' | 'alertdialog';
  class?: string;
}

const Sizes: Record<DialogSize, string> = {
  s: 'max-w-sm',
  m: 'max-w-lg',
  l: 'max-w-2xl',
};

/** Ark keeps the closing dialog mounted until the `-out` animation ends. */
const Pop =
  'motion-safe:state-open:animate-pop-in motion-safe:state-closed:animate-pop-out';
const Fade =
  'motion-safe:state-open:animate-fade-in motion-safe:state-closed:animate-fade-out';

/**
 * A modal window for a task that needs focus: editing settings, choosing
 * media. Focus moves into the dialog, stays there until it closes, then
 * returns to whatever opened it. The content unmounts on close, so a form
 * inside starts clean each time it opens.
 */
export function Dialog(props: DialogProps) {
  const api = useDialog(() => ({
    open: props.open,
    defaultOpen: props.defaultOpen,
    onOpenChange: (details) => props.onOpenChange?.(details.open),
    role: props.role,
    closeOnEscape: props.closeOnEscape,
    closeOnInteractOutside: props.closeOnInteractOutside,
  }));

  const close = () => api().setOpen(false);

  const dismissable = () => props.dismissable ?? true;
  const footer = () => {
    const content = props.footer;
    return typeof content === 'function' ? content(close) : content;
  };

  return (
    <ArkDialog.RootProvider value={api} lazyMount unmountOnExit>
      <Show when={props.trigger}>
        {(render) => (
          <ArkDialog.Trigger
            asChild={(triggerProps) => render()(triggerProps() as TriggerProps)}
          />
        )}
      </Show>

      <Portal>
        <ArkDialog.Backdrop
          class={cn('fixed inset-0 z-50 bg-backdrop', Fade)}
        />
        <ArkDialog.Positioner class='fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8'>
          <ArkDialog.Content
            class={cn(
              'relative flex max-h-full w-full flex-col gap-4 rounded-2xl bg-surface py-6 text-foreground shadow-overlay outline-none',
              Sizes[props.size ?? 'm'],
              Pop,
              props.class
            )}
          >
            <header
              class={cn('flex flex-col gap-1 px-6', dismissable() && 'pr-14')}
            >
              <ArkDialog.Title class='m-0 text-lg leading-7 font-semibold text-foreground-strongest'>
                {props.title}
              </ArkDialog.Title>
              <Show when={props.description}>
                <ArkDialog.Description class='m-0 text-sm text-foreground-muted'>
                  {props.description}
                </ArkDialog.Description>
              </Show>
            </header>

            <Show when={props.children}>
              {/* py-1/-my-1 leaves room for focus rings at the scroll edges. */}
              <div class='-my-1 min-h-0 flex-1 overflow-y-auto px-6 py-1 text-sm'>
                {props.children}
              </div>
            </Show>

            <Show when={footer()}>
              {(content) => (
                <footer class='flex flex-wrap items-center justify-end gap-3 px-6 pt-2'>
                  {content()}
                </footer>
              )}
            </Show>

            {/* Last in the DOM so focus starts on the content, not on "close". */}
            <Show when={dismissable()}>
              <ArkDialog.CloseTrigger
                asChild={(closeProps) => (
                  <IconButton
                    {...(closeProps() as TriggerProps)}
                    quiet
                    icon={X}
                    aria-label='Close'
                    class='absolute top-4 right-4'
                  />
                )}
              />
            </Show>
          </ArkDialog.Content>
        </ArkDialog.Positioner>
      </Portal>
    </ArkDialog.RootProvider>
  );
}
