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
        'flex items-start gap-5.5 border-b border-ink-rule py-5 md:gap-6 xl:pt-6 xl:pb-5.5',
        props.class
      )}
    >
      <IconTile icon={props.icon} tone='ink' />

      <div class='flex min-w-0 max-w-notice-item flex-col pt-0.5'>
        <span class='text-notice-meta font-bold text-brand-lilac uppercase'>
          {props.category}
        </span>

        <h3 class='mt-0.5 font-heading text-base leading-126 font-bold text-ink-subdued xl:text-notice-body'>
          {props.title}
        </h3>

        <p class='mt-2.5 text-sm leading-120 text-ink-subdued xl:text-notice-body'>
          {props.description}
        </p>

        <span class='mt-1 text-notice-meta text-ink-subdued uppercase'>
          {props.date}
        </span>
      </div>
    </li>
  );
}
