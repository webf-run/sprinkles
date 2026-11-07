import { For, Show } from 'solid-js';

import { FocusRing, Transition } from '../core/control';
import { cn } from '../utils';

export interface BreadcrumbItem {
  label: string;
  /** Omit for the current page (last item). */
  href?: string;
}

export interface BreadcrumbProps {
  items: BreadcrumbItem[];
  class?: string;
}

/** Slash-separated trail, e.g. "Home / Pharmacy / B.Pharm". */
export function Breadcrumb(props: BreadcrumbProps) {
  const isLast = (index: number) => index === props.items.length - 1;

  return (
    <nav aria-label='Breadcrumb' class={props.class}>
      <ol
        class={cn(
          'm-0 flex list-none flex-wrap items-center gap-x-2 gap-y-1 p-0',
          'text-fluid-sm leading-120 tracking-normal text-foreground-subtle',
          '2xl:text-fluid-md 2xl:leading-120'
        )}
      >
        <For each={props.items}>
          {(item, index) => (
            <li class='flex items-center gap-2'>
              <Show
                when={item.href && !isLast(index())}
                fallback={
                  <span aria-current={isLast(index()) ? 'page' : undefined}>
                    {item.label}
                  </span>
                }
              >
                <a
                  href={item.href}
                  class={cn(
                    'rounded-xs text-inherit no-underline hover:text-accent hover:underline',
                    FocusRing,
                    Transition
                  )}
                >
                  {item.label}
                </a>
              </Show>

              <Show when={!isLast(index())}>
                <span aria-hidden='true'>/</span>
              </Show>
            </li>
          )}
        </For>
      </ol>
    </nav>
  );
}
