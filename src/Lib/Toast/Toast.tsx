import { Toast as ArkToast, Toaster, createToaster } from '@ark-ui/solid/toast';
import clsx from 'clsx';
import {
  CircleAlert,
  CircleCheck,
  Info,
  LoaderCircle,
  TriangleAlert,
  X,
} from 'lucide-solid';
import { Show, splitProps } from 'solid-js';
import { Dynamic, Portal } from 'solid-js/web';

import style from './Toast.module.css';

export type ToastPlacement =
  | 'top-start'
  | 'top'
  | 'top-end'
  | 'bottom-start'
  | 'bottom'
  | 'bottom-end';

export interface CreateToastStoreOptions {
  placement?: ToastPlacement;
  max?: number;
  overlap?: boolean;
  duration?: number;
  gap?: number;
}

export interface ToastProps {
  toaster: ReturnType<typeof createToaster>;
  class?: string;
}

export function createToastStore(
  options: CreateToastStoreOptions = {}
): ReturnType<typeof createToaster> {
  return createToaster({
    placement: 'bottom-end',
    overlap: true,
    gap: 12,
    ...options,
  });
}

export function Toast(props: ToastProps) {
  const [local] = splitProps(props, ['toaster', 'class']);

  return (
    <Portal>
      <Toaster
        toaster={local.toaster}
        class={clsx(style.viewport, local.class)}
      >
        {(toast) => (
          <ArkToast.Root
            class={style.toast}
            data-variant={getToastVariant(toast().type)}
          >
            <ArkToast.Title class={style.title}>
              <Show when={getToastIcon(toast().type)}>
                {(IconComponent) => (
                  <Dynamic
                    component={IconComponent()}
                    class={clsx(
                      style.icon,
                      toast().type === 'loading' && style.loadingIcon
                    )}
                  />
                )}
              </Show>
              <Show when={toast().title}>{toast().title}</Show>
            </ArkToast.Title>

            <Show when={toast().description}>
              <ArkToast.Description class={style.description}>
                {toast().description}
              </ArkToast.Description>
            </Show>

            <Show when={toast().action?.label}>
              <ArkToast.ActionTrigger class={style.actionTrigger}>
                {toast().action?.label}
              </ArkToast.ActionTrigger>
            </Show>

            <Show when={toast().closable !== false}>
              <div class={style.closeArea}>
                <ArkToast.CloseTrigger class={style.closeTrigger}>
                  <X size={18} />
                </ArkToast.CloseTrigger>
              </div>
            </Show>
          </ArkToast.Root>
        )}
      </Toaster>
    </Portal>
  );
}

function getToastIcon(type?: string | undefined) {
  switch (type) {
    case 'success':
      return CircleCheck;
    case 'error':
      return CircleAlert;
    case 'warning':
      return TriangleAlert;
    case 'info':
      return Info;
    case 'loading':
      return LoaderCircle;
    default:
      return undefined;
  }
}

function getToastVariant(type?: string | undefined) {
  switch (type) {
    case 'success':
      return 'success';
    case 'error':
      return 'error';
    case 'warning':
      return 'warning';
    case 'info':
      return 'info';
    default:
      return 'neutral';
  }
}
