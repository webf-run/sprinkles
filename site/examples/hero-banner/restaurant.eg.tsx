import { Badge, Button, HeroBanner } from '@webf/sprinkles';
import MapPin from 'lucide-solid/icons/map-pin';
import { For } from 'solid-js';

const dishes = [
  {
    name: 'Sourdough, warm to order',
    image: '/images/banners/sourdough.jpg',
    alt: 'Freshly baked sourdough bread',
  },
  {
    name: "Today's seasonal vegetables",
    image: '/images/banners/seasonal-vegetables.jpg',
    alt: 'Seasonal vegetables prepared for dinner',
  },
  {
    name: 'Share plates made for lingering',
    image: '/images/banners/sharing-plates.jpg',
    alt: 'A selection of sharing plates on the table',
  },
];

/** A warm, full-photo restaurant hero with a transparent dish list. */
export default function Example() {
  return (
    <HeroBanner
      variant='highlight'
      eyebrow='Wood-fired kitchen · Seasonal menu'
      image='/images/banners/garden.webp'
      title='Fresh from the market. Warm from the fire.'
      description='Meet us at The Old Market for vegetables from nearby farms, slow-roasted mains and bread pulled warm from the oven. Our seasonal menu is made for easy dinners and long evenings around the table.'
      primaryAction={{ label: 'Reserve a table', href: '#book' }}
      secondaryAction={{ label: 'Order online', href: '#order' }}
      mediaContent={
        <div class='w-full max-w-md space-y-3'>
          <Badge staticColor='white' fillStyle='subtle' size='l' icon={MapPin}>
            The Old Market
          </Badge>
          <For each={dishes}>
            {(dish) => (
              <article class='scheme-dark flex min-w-0 items-center gap-3 rounded-xl border border-white/24 bg-black/32 p-3 text-foreground-inverse backdrop-blur-sm'>
                <img
                  src={dish.image}
                  alt={dish.alt}
                  class='size-16 shrink-0 rounded-lg object-cover sm:size-20'
                />
                <div class='min-w-0 flex-1'>
                  <h2 class='m-0 text-base font-semibold text-foreground-inverse'>
                    {dish.name}
                  </h2>
                  <Button
                    href='#order'
                    size='s'
                    variant='highlight'
                    class='mt-2'
                  >
                    Order now
                  </Button>
                </div>
              </article>
            )}
          </For>
        </div>
      }
    />
  );
}
