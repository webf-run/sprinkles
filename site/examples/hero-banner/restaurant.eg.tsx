import { HeroBanner } from '@webf/sprinkles';
import Clock from 'lucide-solid/icons/clock';
import Leaf from 'lucide-solid/icons/leaf';
import Users from 'lucide-solid/icons/users';
import { For } from 'solid-js';

const perks = [
  { icon: Leaf, title: 'Seasonal menu', text: 'Fresh, local produce' },
  { icon: Clock, title: 'Open daily', text: 'Lunch 12–3 · Dinner 6–10' },
  { icon: Users, title: 'Groups welcome', text: 'Tables for 2 to 20' },
];

/** A restaurant hero: centred copy on a muted band, with three facts along the bottom. */
export default function Example() {
  return (
    <HeroBanner
      layout='overlay'
      surface='muted'
      align='center'
      image='/images/cc/restaurant.jpg'
      imagePosition='center'
      eyebrow='Restaurant & Retail · A place to gather'
      title='Make every meal a memorable one.'
      description='Thoughtfully prepared dishes, seasonal ingredients and a welcoming room. Whether it is a quick lunch or a special evening, there is always something delicious waiting for you.'
      primaryAction={{ label: 'Reserve a table', href: '#reservations' }}
      secondaryAction={{ label: 'Explore our menu', href: '#menu' }}
      note='Free to book · Instant confirmation'
      bottomContent={
        <ul class='m-0 grid list-none gap-3 p-0 @xl:grid-cols-3'>
          <For each={perks}>
            {(perk) => (
              <li class='flex items-center gap-3 rounded-2xl border border-highlight/50 bg-surface/90 p-4 shadow-elevated backdrop-blur-md'>
                <span class='grid size-10 shrink-0 place-items-center rounded-xl bg-highlight text-highlight-foreground'>
                  <perk.icon class='size-5' aria-hidden='true' />
                </span>
                <span>
                  <span class='block text-sm font-semibold text-foreground-strongest'>
                    {perk.title}
                  </span>
                  <span class='block text-xs text-foreground-muted'>
                    {perk.text}
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
