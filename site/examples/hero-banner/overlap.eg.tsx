import { Card, CardBody, HeroBanner, StatCard } from '@webf/sprinkles';
import Award from 'lucide-solid/icons/award';
import Globe from 'lucide-solid/icons/globe';
import GraduationCap from 'lucide-solid/icons/graduation-cap';
import Landmark from 'lucide-solid/icons/landmark';
import Users from 'lucide-solid/icons/users';
import { For } from 'solid-js';

const stats = [
  { icon: Landmark, value: '120+', label: 'Years of excellence' },
  { icon: GraduationCap, value: '85+', label: 'Degree programmes' },
  { icon: Users, value: '9,500+', label: 'Students' },
  { icon: Globe, value: '60+', label: 'Countries represented' },
  { icon: Award, value: 'Top 15', label: 'National university' },
];

export default function Example() {
  return (
    <HeroBanner
      class='@container'
      variant='inverse'
      layout='overlay'
      image='/images/cc/cool-campus.jpg'
      imageTone='cool'
      imageCredit={{
        text: 'Photo: Julian Lupyan · CC0',
        href: 'https://commons.wikimedia.org/wiki/File:Ivy_Covered_Building_in_the_Princeton_University_Campus,_New_Jersey.jpg',
      }}
      eyebrow='Northbridge University · Since 1904'
      title='A community that moves you forward.'
      description='Learn in small classes, put ideas into practice through meaningful placements and find guidance from people invested in your progress. Discover a campus where ambition and belonging grow side by side.'
      primaryAction={{ label: 'Explore programmes', href: '#programmes' }}
      secondaryAction={{ label: 'Plan a campus visit', href: '#visit' }}
    >
      <Card elevated><CardBody><ul class='m-0 grid list-none grid-cols-2 gap-4 p-0 @xl:grid-cols-3 @4xl:grid-flow-col @4xl:auto-cols-fr @4xl:grid-cols-none'><For each={stats}>{(stat) => <li class='flex'><StatCard icon={stat.icon} value={stat.value} label={stat.label} class='max-w-none justify-start border-transparent' /></li>}</For></ul></CardBody></Card>
    </HeroBanner>
  );
}
