import { HeroBanner } from '@webf/sprinkles';
import Footprints from 'lucide-solid/icons/footprints';
import Ticket from 'lucide-solid/icons/ticket';

/** An outdoor-club hero: copy on the left, the photo clear on the right, a membership card at the bottom. */
export default function Example() {
  return (
    <HeroBanner
      layout='overlay'
      surface='accent'
      scrim='soft'
      image='/images/cc/dolomites-hiker.jpg'
      eyebrow='Trailhead Club · All levels welcome'
      title='Get outside more often.'
      description='Join guided walks every weekend, borrow boots, packs and poles from our gear library and meet people who love the same trails. You bring the energy, we plan the route.'
      primaryAction={{ label: 'Join the club', href: '#join' }}
      secondaryAction={{ label: 'See this week’s walks', href: '#walks' }}

      bottomContent={
        <div class='mt-5 w-full @3xl:ml-auto @3xl:max-w-sm'>
          <ul class='m-0 grid list-none gap-4 rounded-2xl border border-border-muted bg-surface/90 p-5 shadow-elevated'>
            <li class='flex items-start gap-3 text-foreground-strongest'>
              <Ticket
                class='mt-1 size-5 shrink-0 text-accent'
                aria-hidden='true'
              />
              <span>
                <span class='block text-base font-semibold'>
                  Annual membership
                </span>
                <span class='block text-sm text-foreground'>
                  $115 / year · Save 20%
                </span>
              </span>
            </li>

            <li class='flex items-start gap-3 text-foreground-strongest'>
              <Footprints
                class='mt-1 size-5 shrink-0 text-accent'
                aria-hidden='true'
              />
              <span>
                <span class='block text-base font-semibold'>
                  Guided walks every weekend
                </span>
                <span class='block text-sm text-foreground'>
                  All levels · Gear library included
                </span>
              </span>
            </li>
          </ul>
        </div>
      }
    />
  );
}
