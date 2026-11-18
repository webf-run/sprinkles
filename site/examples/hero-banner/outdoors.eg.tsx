import { HeroBanner } from '@webf/sprinkles';
import Footprints from 'lucide-solid/icons/footprints';
import Ticket from 'lucide-solid/icons/ticket';

/**
 * An outdoor-club hero: a deep forest-green band on the left, the whole lake
 * in view on the right, a round "free walk" badge on the photo and two plain
 * membership lines at the bottom right.
 */
export default function Example() {
  return (
    <HeroBanner
      layout='overlay'
      variant='positive'
      scrim='soft'
      image='/images/cc/outdoors-lake-wide.jpg'
      imagePosition='right'
      imageCredit={{
        text: 'Photo: mirobo · CC0 · extended',
        href: 'https://commons.wikimedia.org/wiki/File:View_of_lake_in_forest.jpg',
      }}
      eyebrow='Trailhead Club · All levels welcome'
      title='Get outside more often.'
      description='Join guided walks every weekend, borrow boots, packs and poles from our gear library and meet people who love the same trails. You bring the energy, we plan the route.'
      primaryAction={{ label: 'Join the club', href: '#join' }}
      secondaryAction={{ label: 'See this week’s walks', href: '#walks' }}

      bottomContent={
        <div class='mt-5 w-full md:ml-auto md:max-w-sm'>
          <ul class='m-0 grid list-none gap-4 border-t border-positive-foreground/40 p-0 pt-4 [text-shadow:0_1px_4px_var(--color-surface-inverse)]'>
            <li class='flex items-start gap-3 text-positive-foreground'>
              <Ticket class='mt-0.5 size-5 shrink-0' aria-hidden='true' />
              <span>
                <span class='block text-base font-semibold'>
                  Annual membership
                </span>
                <span class='block text-sm'>$115 / year · Save 20%</span>
              </span>
            </li>

            <li class='flex items-start gap-3 text-positive-foreground'>
              <Footprints class='mt-0.5 size-5 shrink-0' aria-hidden='true' />
              <span>
                <span class='block text-base font-semibold'>
                  Guided walks every weekend
                </span>
                <span class='block text-sm'>
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
