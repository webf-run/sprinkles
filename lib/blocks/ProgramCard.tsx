import { ArrowRight } from 'lucide-solid';
import { For } from 'solid-js';

import { cn } from '../utils';
import { Badge } from './Badge';
import { Link } from './Link';

export interface ProgramCardProps {
  badge: string;
  title: string;
  description: string;
  tags: string[];
  ctaLabel: string;
  ctaHref: string;
  class?: string;
}

/** Programme summary card: badge, title, blurb, tags and a call-to-action. */
export function ProgramCard(props: ProgramCardProps) {
  return (
    <article
      class={cn(
        'flex h-full w-full flex-col items-start rounded-3xl bg-surface p-4',
        'md:p-8',
        'xl:px-10.5 xl:py-9.5',
        props.class
      )}
    >
      <Badge
        variant='highlight'
        size='section'
        class='h-auto w-auto px-4 py-2 text-card-badge-sm leading-120 text-white md:text-card-badge-lg'
      >
        {props.badge}
      </Badge>

      <h3
        class={cn(
          'mt-4 text-card-heading-sm leading-120 font-semibold tracking-tight-30 text-foreground-strong',
          'md:mt-5 md:text-card-heading-md',
          'xl:mt-8 xl:text-display-sm'
        )}
      >
        {props.title}
      </h3>

      <p
        class={cn(
          'mt-4 text-card-description-sm leading-143 text-foreground',
          'md:mt-3 md:min-h-[3lh] md:text-body md:leading-145',
          'xl:mt-4 xl:text-lead-xl xl:leading-145 xl:tracking-normal'
        )}
      >
        {props.description}
      </p>

      <div class='mt-4 flex flex-wrap gap-2 md:mt-5 xl:mt-6'>
        <For each={props.tags}>
          {(tag) => (
            <Badge
              variant='tag'
              size='tag'
              class='px-3.5 py-2 leading-120 md:text-card-badge-md'
            >
              {tag}
            </Badge>
          )}
        </For>
      </div>

      <div class='mt-auto pt-4 md:pt-6 xl:pt-10'>
        <Link
          href={props.ctaHref}
          variant='dark'
          size='action'
          icon={ArrowRight}
          class={cn(
            'h-14 gap-4 px-4 text-card-cta leading-120 tracking-tight-30',
            'md:text-body md:leading-165 md:tracking-normal',
            'xl:h-16 xl:rounded-lg xl:px-5.5 xl:text-lead-md xl:leading-120 xl:tracking-tight-30'
          )}
        >
          {props.ctaLabel}
        </Link>
      </div>
    </article>
  );
}
