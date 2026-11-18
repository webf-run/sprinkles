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
  { icon: Heart, value: '61,000', label: 'Monthly supporters' },
];

export default function Example() {
  return (
    <HeroBanner
      class='@container'
      variant='positive'
      layout='overlay'
      align='center'
      image='/images/cc/cool-forest-lake.jpg'
      imageTone='cool'
      imageCredit={{
        text: 'Photo: mirobo · CC0',
        href: 'https://commons.wikimedia.org/wiki/File:View_of_lake_in_forest.jpg',
      }}
      eyebrow='Restoring habitats together'
      title='Small acts can help a forest thrive.'
      description='Your support helps local teams restore damaged landscapes with native trees chosen for each habitat. Follow the work as young forests take root and create healthier places for wildlife and communities.'
      primaryAction={{ label: 'Support the work', href: '#donate' }}
      secondaryAction={{ label: 'See our impact', href: '#impact' }}
    >
      <Card elevated>
        <CardBody>
          <ul class='m-0 grid list-none grid-cols-2 gap-4 p-0 @4xl:grid-flow-col @4xl:auto-cols-fr @4xl:grid-cols-none'>
            <For each={stats}>{(stat) => <li class='flex'><StatCard icon={stat.icon} variant='positive' value={stat.value} label={stat.label} class='max-w-none justify-start border-transparent' /></li>}</For>
          </ul>
        </CardBody>
      </Card>
    </HeroBanner>
  );
}
