import type { IconComponent } from '../types';
import { cn } from '../utils';
import { IconTile } from './IconTile';

export interface AnnouncementListItemProps {
  icon: IconComponent;
  /** Small label above the title, e.g. "Notice". */
  category: string;
  title: string;
  description: string;
  date: string;
  class?: string;
}

/** Row of the announcements list: icon, category, title, summary and date. Render it inside a `<ul>`. */
export function AnnouncementListItem(props: AnnouncementListItemProps) {
  return (
    <li
      class={cn(
        'flex items-start gap-6 border-b border-border-strong py-5 xl:py-6',
        props.class
      )}
    >
      <IconTile
        icon={props.icon}
        variant='neutral'
        size='m'
        class='xl:size-14 xl:*:size-6'
      />

      <div class='flex max-w-180 min-w-0 flex-col pt-1'>
        <span class='text-xs leading-120 font-bold text-accent uppercase'>
          {props.category}
        </span>

        <h3 class='m-0 mt-1 font-heading text-base leading-126 font-bold text-foreground xl:text-lg xl:leading-120'>
          {props.title}
        </h3>

        <p class='m-0 mt-2 text-sm leading-120 text-foreground xl:text-lg xl:leading-120'>
          {props.description}
        </p>

        <span class='mt-1 text-xs leading-120 text-foreground uppercase'>
          {props.date}
        </span>
      </div>
    </li>
  );
}
