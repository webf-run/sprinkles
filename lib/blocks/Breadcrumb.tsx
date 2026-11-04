import { For, Show } from 'solid-js';

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
          'flex list-none flex-wrap items-center gap-x-1.5 gap-y-0.5 p-0',
          'text-fluid-sm leading-120 text-foreground-subtle',
          '2xl:text-(length:--text-fluid-md)'
        )}
      >
        <For each={props.items}>
          {(item, index) => (
            <li class='flex items-center gap-1.5'>
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
                  class='text-inherit no-underline transition-colors duration-200 hover:text-primary hover:underline'
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
