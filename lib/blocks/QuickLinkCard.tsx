import { cn } from '../utils';

export interface QuickLinkCardProps {
  step: string;
  title: string;
  description: string;
  href: string;
  class?: string;
}

/** Numbered link card used for "Quick access" grids. */
export function QuickLinkCard(props: QuickLinkCardProps) {
  return (
    <a
      href={props.href}
      class={cn(
        'group flex h-full w-full flex-col items-start gap-2.5 rounded-badge-tag border border-brand bg-surface p-7',
        'transition-[background-color,border-color,box-shadow,transform] duration-200 ease-out',
        'hover:-translate-y-0.5 hover:border-brand hover:bg-brand-tint hover:shadow-card-purple',
        'xl:h-94.75 xl:w-103.5 xl:shrink-0 xl:p-13.5 xl:px-12',
        props.class
      )}
    >
      <span
        class={cn(
          'flex h-14 w-14 shrink-0 items-center justify-center rounded-full',
          'bg-brand-soft text-display-sm leading-none font-semibold text-brand',
          'transition-colors duration-200 ease-out group-hover:bg-surface',
          'xl:h-23 xl:w-23 xl:text-heading-xl'
        )}
      >
        {props.step}
      </span>

      <span class='flex flex-col gap-1.5'>
        <span
          class={cn(
            'text-card-heading-sm leading-120 font-semibold text-foreground-strong',
            'md:text-card-heading-md',
            'xl:text-display-md xl:leading-120 xl:tracking-tight-20'
          )}
        >
          {props.title}
        </span>

        <span
          class={cn(
            'text-card-description-sm leading-145 text-foreground',
            'md:text-card-description-md',
            'xl:text-card-description-lg xl:leading-145 xl:tracking-normal'
          )}
        >
          {props.description}
        </span>
      </span>
    </a>
  );
}
