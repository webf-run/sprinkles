import { type Component, type JSX, Show } from 'solid-js';
import { Dynamic } from 'solid-js/web';

import { ToneIcon } from '../core/tone';
import { cn } from '../utils';

type IconComponent = Component<{
  class?: string;
  'aria-hidden'?: boolean | 'true';
}>;

export interface EmptyStateProps {
  /** A lucide-solid icon, shown in a round chip. */
  icon?: IconComponent;
  /** A custom illustration instead of the icon. */
  illustration?: JSX.Element;
  /** Says what's empty: “No pages yet”, “No results for ‘pricing’”. */
  heading: JSX.Element;
  /** The heading's level in the page outline. */
  headingLevel?: 2 | 3 | 4;
  /** Why it's empty, or what to do next. */
  description?: JSX.Element;
  /** Buttons that fill the space: “New page”, “Clear filters”. */
  actions?: JSX.Element;
  /** `s` for a table or a panel, `m` for a whole page. */
  size?: 's' | 'm';
  class?: string;
}

/**
 * What a list, table or page shows when there's nothing in it yet, or
 * nothing matches: a heading that says so, and an action to fix it.
 */
export function EmptyState(props: EmptyStateProps) {
  const small = () => props.size === 's';

  return (
    <div
      class={cn(
        'flex flex-col items-center text-center',
        small() ? 'gap-2 px-4 py-8' : 'gap-3 px-6 py-16',
        props.class
      )}
    >
      <Show
        when={props.illustration}
        fallback={
          <Show when={props.icon}>
            {(icon) => (
              <span
                class={cn(
                  'mb-1 flex shrink-0 items-center justify-center rounded-full',
                  small() ? 'size-10' : 'size-12',
                  ToneIcon.neutral
                )}
              >
                <Dynamic
                  component={icon()}
                  class={small() ? 'size-5' : 'size-6'}
                  aria-hidden='true'
                />
              </span>
            )}
          </Show>
        }
      >
        <div class='mb-1' aria-hidden='true'>
          {props.illustration}
        </div>
      </Show>

      <Dynamic
        component={`h${props.headingLevel ?? 3}`}
        class={cn(
          'm-0 font-semibold text-foreground-strong',
          small() ? 'text-base' : 'text-lg'
        )}
      >
        {props.heading}
      </Dynamic>

      <Show when={props.description}>
        <p class='m-0 max-w-sm text-sm text-foreground-muted'>
          {props.description}
        </p>
      </Show>

      <Show when={props.actions}>
        <div class='mt-2 flex flex-wrap justify-center gap-3'>
          {props.actions}
        </div>
      </Show>
    </div>
  );
}
