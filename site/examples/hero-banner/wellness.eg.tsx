import { HeroBanner } from '@webf/sprinkles';
import CalendarDays from 'lucide-solid/icons/calendar-days';
import HeartPulse from 'lucide-solid/icons/heart-pulse';
import Stethoscope from 'lucide-solid/icons/stethoscope';
import { For } from 'solid-js';

const points = [
  {
    icon: HeartPulse,
    title: 'Care, your way',
    text: 'Here when you need us',
  },
  {
    icon: Stethoscope,
    title: 'Personal guidance',
    text: 'A care team that listens',
  },
  {
    icon: CalendarDays,
    title: 'Flexible visits',
    text: 'Appointments around your day',
  },
];

/** A calm clinic hero: copy on a pale band, the photo in its own panel with a card of care promises. */
export default function Example() {
  return (
    <HeroBanner
      layout='framed'
      surface='muted'
      image='/images/cc/clinic-doorway.jpg'
      imagePosition='top'
      imageCredit={{
        text: 'Photo: Shixart1985 · CC BY 2.0 · cropped',
        href: 'https://commons.wikimedia.org/wiki/File:Doctor_greeting_a_patient_in_clinic_room_two.jpg',
      }}
      eyebrow='Care that starts with listening'
      eyebrowVariant='positive'
      title='Feel better, with care that feels personal.'
      description='From everyday health checks to ongoing support, meet a care team that takes time to understand you. Choose how you connect and get clear guidance for every stage of life.'
      primaryAction={{ label: 'Book an appointment', href: '#book' }}
      secondaryAction={{ label: 'Explore our services', href: '#services' }}
      note='Same-week appointments · Video or in person'
      mediaContent={
        <ul class='m-0 w-full max-w-xs list-none divide-y divide-border-muted overflow-hidden rounded-2xl border border-border-muted bg-surface/95 p-0 shadow-elevated backdrop-blur-md'>
          <For each={points}>
            {(point) => (
              <li class='flex items-center gap-4 px-5 py-4 @max-xl:nth-3:hidden'>
                <span class='grid size-10 shrink-0 place-items-center rounded-full bg-positive-subtle text-positive-subtle-foreground'>
                  <point.icon class='size-5' aria-hidden='true' />
                </span>
                <span>
                  <span class='block text-sm font-semibold text-foreground-strongest'>
                    {point.title}
                  </span>
                  <span class='block text-sm text-foreground-muted'>
                    {point.text}
                  </span>
                </span>
              </li>
            )}
          </For>
        </ul>
      }
    />
  );
}
