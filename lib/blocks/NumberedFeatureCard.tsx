import { Show } from 'solid-js';

import { cn } from '../utils';

export interface NumberedFeatureCardProps {
  number: number | string;
  title: string;
  description: string;

  variant?: 'default' | 'compact';

  eyebrow?: string;
  class?: string;
}

/** Card with a numbered badge, a title and a short description. */
export function NumberedFeatureCard(props: NumberedFeatureCardProps) {
  return (
    <Show
      when={props.variant === 'compact'}
      fallback={
        <div
          class={cn(
            'flex w-full flex-col gap-2.5 rounded-15 border border-primary bg-surface',
            'shadow-offset-md',
            'p-6',
            'md:p-8',
            'xl:px-12 xl:py-13.5',
            props.class
          )}
        >
          <span
            class={cn(
              'flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-surface-tint',
              'text-(length:--text-fluid-md) leading-120 font-semibold text-primary',
              'xl:h-23 xl:w-23 xl:text-(length:--text-fluid-2xl)'
            )}
          >
            {props.number}
          </span>

          <h3
            class={cn(
              'text-(length:--text-fluid-md) leading-120 font-semibold text-foreground-strong',
              'md:text-(length:--text-fluid-xl)',
              'xl:text-[48px]'
            )}
          >
            {props.title}
          </h3>

          <p
            class={cn(
              'text-(length:--text-fluid-sm) leading-143 text-foreground',
              'md:text-(length:--text-fluid-md)',
              'xl:text-(length:--text-fluid-md)'
            )}
          >
            {props.description}
          </p>
        </div>
      }
    >
      <div
        class={cn(
          'flex w-full items-center gap-2.5 rounded-10 border border-border-subtle bg-surface',
          'px-4 py-3',
          'md:px-6 md:py-4',
          '2xl:px-7.5',
          props.class
        )}
      >
        <span
          class={cn(
            'flex size-8 shrink-0 items-center justify-center rounded-10 bg-purple-85',
            'text-(length:--text-fluid-sm) leading-none font-bold text-primary-dark',
            '2xl:size-9'
          )}
        >
          {props.number}
        </span>

        <div class='flex min-w-0 flex-col gap-0.5'>
          <Show when={props.eyebrow}>
            <span
              class={cn(
                'text-(length:--text-fluid-sm) leading-120 font-semibold text-primary-dark',
                '2xl:text-(length:--text-fluid-md)'
              )}
            >
              {props.eyebrow}
            </span>
          </Show>

          <span
            class={cn(
              'text-(length:--text-fluid-sm) leading-120 font-semibold text-foreground-strongest',
              '2xl:text-(length:--text-fluid-md)'
            )}
          >
            {props.title}
          </span>

          <span
            class={cn(
              'text-(length:--text-fluid-sm) leading-120 text-foreground-muted',
              '2xl:text-(length:--text-fluid-md)'
            )}
          >
            {props.description}
          </span>
        </div>
      </div>
    </Show>
  );
}
