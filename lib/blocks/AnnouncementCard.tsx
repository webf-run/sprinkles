import { ArrowRight } from 'lucide-solid';

import type { IconComponent } from '../types';
import { cn } from '../utils';
import { Badge } from './Badge';
import { IconTile } from './IconTile';
import { Link } from './Link';

const ActionArrow: IconComponent = (props) => (
  <ArrowRight {...props} class='text-purple-385' />
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
        'flex flex-col items-start justify-center gap-4.25 rounded-15 border border-primary-dark bg-surface',
        'p-7.5 xl:py-10',
        props.class
      )}
    >
      <div class='flex items-center gap-3'>
        <IconTile icon={props.icon} tone='plum' />

        <div class='flex flex-col gap-2.5 font-bold uppercase'>
          <span class='text-[11px]/[1.2] text-purple-385'>
            {props.eyebrow}
          </span>
          <span class='text-[10px]/[1.2] text-purple-235'>
            {props.caption}
          </span>
        </div>
      </div>

      <Badge variant='tag' size='notice'>
        {props.tag}
      </Badge>

      <h3 class='flex flex-col gap-1.25 font-heading text-primary-dark'>
        <span class='text-[28px]/[1.1] leading-none font-bold xl:text-[30px]/[1.26] xl:leading-126'>
          {props.title}
        </span>
        <span class='text-[22px]/[1.1] leading-none font-normal xl:text-[25px]/[1.26] xl:leading-126'>
          {props.subtitle}
        </span>
      </h3>

      <p class='max-w-[475px] text-sm leading-120 text-foreground xl:text-[18px]/[1.2]'>
        {props.description}
      </p>

      <div class='mt-1 flex flex-col items-start gap-3.5 self-stretch border-t border-purple-685 pt-4.5 xl:flex-row xl:flex-wrap xl:items-center xl:justify-between xl:gap-4 xl:pt-8'>
        <div class='flex flex-col gap-2 whitespace-nowrap uppercase'>
          <span class='text-[9.5px]/[1.2] font-bold text-neutral-385'>
            {props.dateLabel}
          </span>
          <span class='text-[13px]/[1.2] text-foreground-strong'>
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
