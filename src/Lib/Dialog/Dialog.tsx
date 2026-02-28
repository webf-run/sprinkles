import {
  Dialog as ArkDialog,
  type UseDialogProps,
  type UseDialogReturn,
  useDialog,
} from '@ark-ui/solid/dialog';
import clsx from 'clsx';
import { X } from 'lucide-solid';
import { type JSX, Show, splitProps } from 'solid-js';
import { Portal } from 'solid-js/web';

import style from './Dialog.module.css';

export type DialogSize = 'sm' | 'md' | 'lg';

export interface DialogProps {
  /** Signal controller for the dialog. */
  controller: UseDialogReturn;

  /** Content */
  title?: JSX.Element;
  description?: JSX.Element;
  children: JSX.Element;

  /** Styling */
  size?: DialogSize;
  class?: string;
  contentClass?: string;
  backdropClass?: string;
}

export function createDialog(options: UseDialogProps = {}): UseDialogReturn {
  return useDialog({
    modal: true,
    closeOnInteractOutside: true,
    closeOnEscape: true,
    ...options,
  });
}

export function Dialog(props: DialogProps) {
  const [local] = splitProps(props, [
    'controller',
    'title',
    'description',
    'children',
    'size',
    'class',
    'contentClass',
    'backdropClass',
  ]);

  return (
    <ArkDialog.RootProvider
      value={local.controller}
      lazyMount={true}
      unmountOnExit={true}
    >
      <Portal>
        <ArkDialog.Backdrop class={clsx(style.backdrop, local.backdropClass)} />

        <ArkDialog.Positioner class={style.positioner}>
          <ArkDialog.Content
            class={clsx(style.dialog, local.class, local.contentClass)}
            data-size={local.size ?? 'md'}
          >
            <div class={style.header}>
              <div class={style.headingContent}>
                <Show when={local.title}>
                  <ArkDialog.Title class={style.title}>
                    {local.title}
                  </ArkDialog.Title>
                </Show>

                <Show when={local.description}>
                  <ArkDialog.Description class={style.description}>
                    {local.description}
                  </ArkDialog.Description>
                </Show>
              </div>

              <ArkDialog.CloseTrigger
                class={style.closeTrigger}
                aria-label='Close dialog'
              >
                <X size={18} />
              </ArkDialog.CloseTrigger>
            </div>

            <div class={style.body}>{local.children}</div>
          </ArkDialog.Content>
        </ArkDialog.Positioner>
      </Portal>
    </ArkDialog.RootProvider>
  );
}
