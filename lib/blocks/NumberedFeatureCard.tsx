import { cn } from '../utils';

export interface NumberedFeatureCardProps {
  number: number | string;
  title: string;
  description: string;
  class?: string;
}

/** Card with a numbered badge, a title and a short description. */
export function NumberedFeatureCard(props: NumberedFeatureCardProps) {
  return (
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
  );
}
