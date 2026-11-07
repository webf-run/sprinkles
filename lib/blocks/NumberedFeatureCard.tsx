import { Show } from 'solid-js';

import { cn } from '../utils';

export interface NumberedFeatureCardProps {
  number: number | string;
  title: string;
  description: string;
  /** `default`: a tall card with a large number; `compact`: a one-line row. */
  variant?: 'default' | 'compact';
  /** `compact` only: a small label above the title. */
  eyebrow?: string;
  class?: string;
}

/** A numbered step or reason: the number, a title and a short description. */
export function NumberedFeatureCard(props: NumberedFeatureCardProps) {
  return (
    <Show
      when={props.variant === 'compact'}
      fallback={
        <div
          class={cn(
            'flex w-full flex-col gap-3 rounded-2xl border border-accent bg-surface p-6 shadow-elevated',
            'md:p-8 xl:px-12 xl:py-14',
            props.class
          )}
        >
          <span
            aria-hidden='true'
            class={cn(
              'flex size-10 shrink-0 items-center justify-center rounded-full bg-surface-tint',
              'text-fluid-md leading-120 font-semibold text-accent',
              'xl:size-24 xl:text-fluid-2xl xl:leading-120'
            )}
          >
            {props.number}
          </span>

          <h3
            class={cn(
              'm-0 text-fluid-md leading-120 font-semibold tracking-normal text-foreground-strong',
              'md:text-fluid-xl md:leading-120 xl:text-5xl xl:leading-120'
            )}
          >
            {props.title}
          </h3>

          <p class='m-0 text-fluid-sm leading-143 text-foreground md:text-fluid-md md:leading-143'>
            {props.description}
          </p>
        </div>
      }
    >
      <div
        class={cn(
          'flex w-full items-center gap-3 rounded-xl border border-border-subtle bg-surface',
          'px-4 py-3 md:px-6 md:py-4 2xl:px-8',
          props.class
        )}
      >
        <span
          aria-hidden='true'
          class={cn(
            'flex size-8 shrink-0 items-center justify-center rounded-lg bg-accent-subtle',
            'text-fluid-sm leading-none font-bold text-accent-subtle-foreground',
            '2xl:size-9'
          )}
        >
          {props.number}
        </span>

        <div class='flex min-w-0 flex-col gap-1 text-fluid-sm leading-120 2xl:text-fluid-md 2xl:leading-120'>
          <Show when={props.eyebrow}>
            <span class='font-semibold text-accent'>{props.eyebrow}</span>
          </Show>
          <span class='font-semibold text-foreground-strongest'>
            {props.title}
          </span>
          <span class='text-foreground-muted'>{props.description}</span>
        </div>
      </div>
    </Show>
  );
}
