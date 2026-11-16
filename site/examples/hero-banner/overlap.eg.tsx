import { Card, CardBody, HeroBanner, StatCard } from '@webf/sprinkles';
import Award from 'lucide-solid/icons/award';
import Globe from 'lucide-solid/icons/globe';
import GraduationCap from 'lucide-solid/icons/graduation-cap';
import Landmark from 'lucide-solid/icons/landmark';
import Users from 'lucide-solid/icons/users';
import { For } from 'solid-js';

// Add or remove entries: the row shares the width equally, from three to five.
// `@container` on the banner makes `@xl:` and `@4xl:` follow its width, not the window's.
const stats = [
  { icon: Landmark, value: '120+', label: 'Years of excellence' },
  { icon: GraduationCap, value: '85+', label: 'Degree programs' },
  { icon: Users, value: '9,500+', label: 'Students' },
  { icon: Globe, value: '60+', label: 'Countries represented' },
  { icon: Award, value: 'Top 15', label: 'National university' },
];

export default function Example() {
  return (
    <HeroBanner
      class='@container'
      eyebrow='Northbridge University · Since 1904'
      image='/images/northbridge/campus.webp'
      title='Empowering minds. Inspiring futures.'
      description='Learn in small classes where teachers know your name and can give your work thoughtful attention throughout your degree. Put that learning into practice through a paid placement with one of our employer partners, while dedicated advisers help you explore scholarships and plan your next step.'
      primaryAction={{ label: 'Explore programs', href: '#programs' }}
      secondaryAction={{ label: 'Visit campus', href: '#visit' }}
    >
      <Card elevated>
        <CardBody>
          <ul class='m-0 grid list-none grid-cols-2 gap-4 p-0 @xl:grid-cols-3 @4xl:grid-flow-col @4xl:auto-cols-fr @4xl:grid-cols-none'>
            <For each={stats}>
              {(stat) => (
                <li class='flex'>
                  <StatCard
                    icon={stat.icon}
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
