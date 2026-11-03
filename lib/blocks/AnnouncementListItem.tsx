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
        'flex items-start gap-5.5 border-b border-neutral-720 py-5 md:gap-6 xl:pt-6 xl:pb-5.5',
        props.class
      )}
    >
      <IconTile icon={props.icon} tone='ink' />

      <div class='flex min-w-0 max-w-[721px] flex-col pt-0.5'>
        <span class='text-[12px]/[1.2] font-bold text-purple-385 uppercase'>
          {props.category}
        </span>

        <h3 class='mt-0.5 font-heading text-base leading-126 font-bold text-foreground xl:text-[18px]/[1.2]'>
          {props.title}
        </h3>

        <p class='mt-2.5 text-sm leading-120 text-foreground xl:text-[18px]/[1.2]'>
          {props.description}
        </p>

        <span class='mt-1 text-[12px]/[1.2] text-foreground uppercase'>
          {props.date}
        </span>
      </div>
    </li>
  );
}
