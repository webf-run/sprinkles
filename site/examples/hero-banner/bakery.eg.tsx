import { HeroBanner } from '@webf/sprinkles';
import { For } from 'solid-js';

const bakes = [
  { name: 'Country sourdough', time: '8:00' },
  { name: 'Seeded rye', time: '10:30' },
  { name: 'Cardamom buns', time: '12:00' },
];

/** A bakery hero: framed photo, copy on the right, a list of today's bakes on the photo. */
export default function Example() {
  return (
    <HeroBanner
      layout='framed'
      surface='muted'
      contentSide='end'
      image='/images/cc/sourdough.jpg'
      imageCredit={{
        text: 'Photo: Agelaia · CC BY 4.0',
        href: 'https://commons.wikimedia.org/wiki/File:Sourdough_Bread_Loaf.jpg',
      }}
      eyebrow='Hearth & Crumb · Neighbourhood bakery'
      title='Baked slowly. Gone quickly.'
      description='Long-fermented loaves, buttery pastries and strong coffee, made every morning in the same small oven. Order ahead and collect it warm on your way to work.'
      primaryAction={{ label: 'Order for pickup', href: '#order' }}
      secondaryAction={{ label: 'See today’s bakes', href: '#today' }}
      note='Order by 6 pm for tomorrow · Collect from 7 am'
      mediaContent={
        <div class='w-full max-w-xs rounded-2xl border border-border-muted bg-surface/90 p-5 shadow-elevated'>
          <p class='m-0 text-xs font-semibold tracking-wide-130 text-foreground-muted uppercase'>
            Out of the oven today
          </p>
          <ul class='m-0 mt-3 grid list-none p-0'>
            <For each={bakes}>
              {(bake) => (
                <li class='flex items-baseline gap-2 border-b border-dashed border-border-muted py-2 last:border-b-0 @max-xl:nth-3:hidden'>
                  <span class='text-sm font-semibold text-foreground-strongest'>
                    {bake.name}
                  </span>
                  <span
                    class='min-w-4 flex-1 border-b border-dotted border-border'
                    aria-hidden='true'
                  />
                  <span class='text-sm text-foreground-muted tabular-nums'>
                    {bake.time}
                  </span>
                </li>
              )}
            </For>
          </ul>
        </div>
      }
    />
  );
}
