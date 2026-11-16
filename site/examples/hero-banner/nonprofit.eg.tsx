import { Card, CardBody, HeroBanner, StatCard } from '@webf/sprinkles';
import Heart from 'lucide-solid/icons/heart';
import MapPin from 'lucide-solid/icons/map-pin';
import Sprout from 'lucide-solid/icons/sprout';
import TreePine from 'lucide-solid/icons/tree-pine';
import { For } from 'solid-js';

const stats = [
  { icon: TreePine, value: '2.4M', label: 'Trees planted' },
  { icon: MapPin, value: '38', label: 'Forests restored' },
  { icon: Sprout, value: '92%', label: 'Seedlings survive' },
  { icon: Heart, value: '61,000', label: 'Monthly donors' },
];

/**
 * A charity or environmental group: a green band, centred text, a warm
 * donate button and a row of impact numbers across the bottom edge.
 */
export default function Example() {
  return (
    <HeroBanner
      class='@container'
      variant='positive'
      align='center'
      eyebrow='Restoring habitats together'
      image='/images/banners/forest.webp'
      title='Plant a tree. Restore a forest.'
      description='Your support helps local crews restore damaged forests with native trees chosen for each landscape. Teams care for young growth through its first seasons, and share regular field updates so you can follow the work and see how a healthier forest supports the wildlife and communities around it.'
      primaryAction={{ label: 'Donate now', href: '#donate' }}
      secondaryAction={{ label: 'See our impact', href: '#impact' }}
    >
      <Card elevated>
        <CardBody>
          <ul class='m-0 grid list-none grid-cols-2 gap-4 p-0 @4xl:grid-flow-col @4xl:auto-cols-fr @4xl:grid-cols-none'>
            <For each={stats}>
              {(stat) => (
                <li class='flex'>
                  <StatCard
                    icon={stat.icon}
                    variant='positive'
                    value={stat.value}
                    label={stat.label}
                    class='max-w-none justify-start border-transparent'
                  />
                </li>
              )}
            </For>
          </ul>
        </CardBody>
      </Card>
    </HeroBanner>
  );
}
