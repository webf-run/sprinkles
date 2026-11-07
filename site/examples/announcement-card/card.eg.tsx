import { AnnouncementCard } from '@webf/sprinkles';
import Bell from 'lucide-solid/icons/bell';

export default function Example() {
  return (
    <AnnouncementCard
      class='max-w-xl'
      icon={Bell}
      eyebrow='Featured announcement'
      caption='Trust-wide notice'
      tag='Admissions'
      title='Admissions open'
      subtitle='for the 2027 academic year'
      description='Applications for all programmes are open until 30 June. Scholarships are available for merit and need.'
      dateLabel='Published'
      date='12 Nov 2026'
      actionLabel='Read more'
      actionHref='#'
    />
  );
}
