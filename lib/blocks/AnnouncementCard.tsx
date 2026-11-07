import ArrowRight from 'lucide-solid/icons/arrow-right';

import { Badge } from '../components/Badge';
import { Button } from '../components/Button';
import type { IconComponent } from '../types';
import { cn } from '../utils';
import { IconTile } from './IconTile';

export interface AnnouncementCardProps {
  icon: IconComponent;
  /** Uppercase label beside the icon, e.g. "Featured announcement". */
  eyebrow: string;
  /** Fainter second line under the eyebrow. */
  caption: string;
  /** Label above the title. */
  tag: string;
  title: string;
  subtitle: string;
  description: string;
  dateLabel: string;
  date: string;
  actionLabel: string;
  actionHref: string;
  class?: string;
}

/** Outlined card that spotlights one announcement, with a date and a call to action. */
export function AnnouncementCard(props: AnnouncementCardProps) {
  return (
    <article
      class={cn(
        'flex flex-col items-start justify-center gap-4 rounded-2xl border border-accent bg-surface p-8 xl:py-10',
        props.class
      )}
    >
      <div class='flex items-center gap-3'>
        <IconTile icon={props.icon} variant='inverse' size='xl' />

        <div class='flex flex-col gap-2 text-xs leading-120 font-bold uppercase'>
          <span class='text-accent'>{props.eyebrow}</span>
          <span class='text-foreground-subtle'>{props.caption}</span>
        </div>
      </div>

      <Badge variant='accent' fillStyle='outline' size='l'>
        {props.tag}
      </Badge>

      <h3 class='m-0 flex flex-col gap-1 font-heading text-accent'>
        <span class='text-3xl leading-110 font-bold xl:leading-126'>
          {props.title}
        </span>
        <span class='text-2xl leading-110 font-normal xl:leading-126'>
          {props.subtitle}
        </span>
      </h3>

      <p class='m-0 max-w-120 text-sm leading-120 text-foreground xl:text-lg xl:leading-120'>
        {props.description}
      </p>

      <div class='mt-1 flex flex-col items-start gap-4 self-stretch border-t border-border-strong pt-4 xl:flex-row xl:flex-wrap xl:items-center xl:justify-between xl:pt-8'>
        <div class='flex flex-col gap-2 leading-120 whitespace-nowrap uppercase'>
          <span class='text-xs font-bold text-foreground-subtle'>
            {props.dateLabel}
          </span>
          <span class='text-sm text-foreground-strong'>{props.date}</span>
        </div>

        <Button href={props.actionHref} size='l' iconEnd={ArrowRight}>
          {props.actionLabel}
        </Button>
      </div>
    </article>
  );
}
