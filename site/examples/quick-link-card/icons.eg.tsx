import { QuickLinkCard } from '@webf/sprinkles';
import CalendarDays from 'lucide-solid/icons/calendar-days';
import MapPin from 'lucide-solid/icons/map-pin';
import Tag from 'lucide-solid/icons/tag';

export default function Example() {
  return (
    <div class='@container w-full'>
      <div class='grid gap-4 @2xl:grid-cols-3'>
        <QuickLinkCard
          icon={CalendarDays}
          title='Timetable'
          description='Every class, every day of the week.'
          href='#timetable'
        />
        <QuickLinkCard
          icon={Tag}
          title='Pricing'
          description='Term passes, drop-in classes and family discounts.'
          href='#pricing'
        />
        <QuickLinkCard
          icon={MapPin}
          title='Find us'
          description='Two studios in Riverside, five minutes from the station.'
          href='#find-us'
        />
      </div>
    </div>
  );
}
