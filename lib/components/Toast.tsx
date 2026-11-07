import {
  Toast as ArkToast,
  Toaster as ArkToaster,
  type CreateToasterProps,
  type CreateToasterReturn,
  type ToastOptions,
  createToaster as createArkToaster,
} from '@ark-ui/solid/toast';
import CircleAlert from 'lucide-solid/icons/circle-alert';
import CircleCheck from 'lucide-solid/icons/circle-check';
import Info from 'lucide-solid/icons/info';
import TriangleAlert from 'lucide-solid/icons/triangle-alert';
import X from 'lucide-solid/icons/x';
import { type Accessor, type Component, Match, Show, Switch } from 'solid-js';
import { Dynamic, Portal } from 'solid-js/web';

import { ControlReset, FocusRing, Transition } from '../core/control';
import { ToneFill } from '../core/tone';
import { cn } from '../utils';
import { Spinner } from './Spinner';

/** What `createToaster` returns: call `.success()`, `.error()`, `.create()`, `.promise()` on it. */
export type ToastStore = CreateToasterReturn;

export type CreateToasterOptions = Partial<CreateToasterProps>;

/**
 * Creates the store that toasts are sent to. Call it once in the app (not
 * in the library) and pass it to `<Toaster>`. Defaults: bottom-end,
 * stacked rather than overlapping, at most five on screen.
 */
export function createToaster(options: CreateToasterOptions = {}): ToastStore {
  return createArkToaster({
    placement: 'bottom-end',
    overlap: false,
    gap: 12,
    max: 5,
    ...options,
  });
}

type ToastTone = 'neutral' | 'informative' | 'positive' | 'notice' | 'negative';

const ToneByType: Record<string, ToastTone> = {
  info: 'informative',
  success: 'positive',
  warning: 'notice',
  error: 'negative',
};

const IconByType: Record<
  string,
  Component<{ class?: string; 'aria-hidden'?: 'true' }>
> = {
  info: Info,
  success: CircleCheck,
  warning: TriangleAlert,
  error: CircleAlert,
};

/** Toasts take the colour of the bold fill, so buttons inside follow `currentColor`. */
const OnFillButton = [
  'inline-flex shrink-0 cursor-pointer items-center justify-center border-0 bg-transparent p-0 text-inherit',
  ControlReset,
  'hover:bg-current/16 active:bg-current/24',
  FocusRing,
  Transition,
].join(' ');

/**
 * Slides in from the edge and out again. Ark sets the position through
 * CSS variables (wired in `style` below) and keeps a closing toast for
 * `removeDelay` (200 ms), so the transition is 200 ms too.
 */
const Motion =
  'motion-safe:transition-all motion-safe:duration-200 motion-safe:ease-emphasized';

function ToastItem(props: { toast: Accessor<ToastOptions> }) {
  const type = () => props.toast().type ?? '';
  const tone = () => ToneByType[type()] ?? 'neutral';

  return (
    <ArkToast.Root
      class={cn(
        'box-border flex items-start gap-3 rounded-xl p-4 text-sm shadow-overlay',
        ToneFill[tone()].bold,
        FocusRing,
        Motion
      )}
      style={{
        width: 'min(24rem, calc(100vw - 2rem))',
        translate: 'var(--x) var(--y)',
        scale: 'var(--scale)',
        'z-index': 'var(--z-index)',
        height: 'var(--height)',
        opacity: 'var(--opacity)',
      }}
    >
      <Switch>
        <Match when={type() === 'loading'}>
          <span class='flex h-6 shrink-0 items-center'>
            <Spinner tone='current' size='s' label='Working' />
          </span>
        </Match>
        <Match when={IconByType[type()]}>
          {(icon) => (
            <span class='flex h-6 shrink-0 items-center'>
              <Dynamic component={icon()} class='size-5' aria-hidden='true' />
            </span>
          )}
        </Match>
      </Switch>

      <div class='flex min-w-0 flex-1 flex-col items-start gap-1'>
        <ArkToast.Title class='leading-6 font-semibold'>
          {props.toast().title}
        </ArkToast.Title>
        <Show when={props.toast().description}>
          <ArkToast.Description class='leading-5'>
            {props.toast().description}
          </ArkToast.Description>
        </Show>
        <Show when={props.toast().action}>
          {(action) => (
            <ArkToast.ActionTrigger
              class={cn(
                OnFillButton,
                'mt-2 h-8 rounded-lg border-2 border-current px-3 text-sm font-semibold'
              )}
            >
              {action().label}
            </ArkToast.ActionTrigger>
          )}
        </Show>
      </div>

      <Show when={props.toast().closable !== false}>
        <ArkToast.CloseTrigger
          class={cn(OnFillButton, '-mr-1 size-6 rounded-md')}
        >
          <X class='size-4' aria-hidden='true' />
        </ArkToast.CloseTrigger>
      </Show>
    </ArkToast.Root>
  );
}

export interface ToasterProps {
  /** The store from `createToaster`. */
  toaster: ToastStore;
  /** Names the region for screen readers. Alt+T moves focus to it. */
  label?: string;
  class?: string;
}

/**
 * Renders the toasts sent to a store: brief messages about something that
 * just happened (“Page published”). Types map to the semantic roles:
 * `info` informative, `success` positive, `warning` notice, `error`
 * negative, `loading` a spinner; `neutral` (or any other type) is neutral.
 * Ark's `toaster.create()` defaults to `info`, so pass `type: 'neutral'`.
 */
export function Toaster(props: ToasterProps) {
  return (
    <Portal>
      <ArkToaster
        toaster={props.toaster}
        label={props.label}
        class={props.class}
      >
        {(toast) => <ToastItem toast={toast} />}
      </ArkToaster>
    </Portal>
  );
}
