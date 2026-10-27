import { ArrowRight } from 'lucide-solid';

import type { IconComponent } from '../types';
import { cn } from '../utils';
import { Badge } from './Badge';
import { IconTile } from './IconTile';
import { Link } from './Link';

const ActionArrow: IconComponent = (props) => (
  <ArrowRight {...props} class='text-brand-lilac' />
);

export interface AnnouncementCardProps {
  icon: IconComponent;
  /** Uppercase label beside the icon, e.g. "Featured announcement". */
  eyebrow: string;
  /** Fainter second line under the eyebrow. */
  caption: string;
  /** Pill above the title. */
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
        'flex flex-col items-start justify-center gap-4.25 rounded-badge-tag border border-brand-deep bg-surface',
        'p-6 xl:px-7.5 xl:py-10',
        props.class
      )}
    >
      <div class='flex items-center gap-3'>
        <IconTile icon={props.icon} tone='plum' />

        <div class='flex flex-col gap-2.5 font-bold uppercase'>
          <span class='text-notice-eyebrow text-brand-lilac'>
            {props.eyebrow}
          </span>
          <span class='text-notice-caption text-brand-lilac-soft'>
            {props.caption}
          </span>
        </div>
      </div>

      <Badge variant='tag' size='notice'>
        {props.tag}
      </Badge>

      <h3 class='flex flex-col gap-1.25 font-heading text-brand-deep'>
        <span class='text-subtitle font-bold xl:text-notice-title'>
          {props.title}
        </span>
        <span class='text-card font-normal xl:text-notice-subtitle'>
          {props.subtitle}
        </span>
      </h3>

      <p class='max-w-notice-copy text-notice-body text-ink-subdued'>
        {props.description}
      </p>

      <div class='mt-1 flex w-full flex-wrap items-center justify-between gap-4 border-t border-ink-slate pt-8'>
        <div class='flex flex-col gap-2 whitespace-nowrap uppercase'>
          <span class='text-notice-label font-bold text-ink-faint'>
            {props.dateLabel}
          </span>
          <span class='text-notice-date text-foreground-strong'>
            {props.date}
          </span>
        </div>

        <Link
          href={props.actionHref}
          variant='plum'
          size='notice'
          icon={ActionArrow}
        >
          {props.actionLabel}
        </Link>
      </div>
    </article>
  );
}
