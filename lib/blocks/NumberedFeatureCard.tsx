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
            'flex w-full flex-col gap-2.5 rounded-badge-tag border border-brand bg-surface',
            'shadow-card-purple',
            'p-6',
            'md:p-8',
            'xl:px-12 xl:py-13.5',
            props.class
          )}
        >
          <span
            class={cn(
              'flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-tint',
              'text-card-heading-sm leading-120 font-semibold text-brand',
              'xl:h-23 xl:w-23 xl:text-heading-xl'
            )}
          >
            {props.number}
          </span>

          <h3
            class={cn(
              'text-card-heading-sm leading-120 font-semibold text-foreground-strong',
              'md:text-card-heading-lg',
              'xl:text-[48px]'
            )}
          >
            {props.title}
          </h3>

          <p
            class={cn(
              'text-card-description-sm leading-143 text-foreground',
              'md:text-card-description-md',
              'xl:text-card-description-lg'
            )}
          >
            {props.description}
          </p>
        </div>
      }
    >
      <div
        class={cn(
          'flex w-full items-center gap-2.5 rounded-badge-outline border border-brand-hairline bg-surface',
          'px-4 py-3',
          'md:px-6 md:py-4',
          '2xl:px-7.5',
          props.class
        )}
      >
        <span
          class={cn(
            'flex size-8 shrink-0 items-center justify-center rounded-badge-outline bg-brand-pale',
            'text-card-tag-md leading-none font-bold text-brand-deep',
            '2xl:size-9'
          )}
        >
          {props.number}
        </span>

        <div class='flex min-w-0 flex-col gap-0.5'>
          <Show when={props.eyebrow}>
            <span
              class={cn(
                'text-card-tag-md leading-120 font-semibold text-brand-deep',
                '2xl:text-card-description-md'
              )}
            >
              {props.eyebrow}
            </span>
          </Show>

          <span
            class={cn(
              'text-card-tag-md leading-120 font-semibold text-ink',
              '2xl:text-card-description-md'
            )}
          >
            {props.title}
          </span>

          <span
            class={cn(
              'text-card-tag-md leading-120 text-ink-muted',
              '2xl:text-card-description-md'
            )}
          >
            {props.description}
          </span>
        </div>
      </div>
    </Show>
  );
}
