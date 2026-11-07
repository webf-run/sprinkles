import { AnnouncementListItem } from '@webf/sprinkles';
import Calendar from 'lucide-solid/icons/calendar';
import Newspaper from 'lucide-solid/icons/newspaper';

export default function Example() {
  return (
    <ul class='m-0 w-full list-none p-0'>
      <AnnouncementListItem
        icon={Calendar}
        category='Event'
        title='Annual sports day'
        description='Track and field events for all students, with parents welcome.'
        date='20 Dec 2026'
      />
      <AnnouncementListItem
        icon={Newspaper}
        category='Notice'
        title='Winter timetable'
        description='Classes start at 9:30 from 1 December.'
        date='28 Nov 2026'
      />
    </ul>
  );
}
