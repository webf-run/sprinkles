import { FeatureCard } from '@webf/sprinkles';
import { Boxes } from 'lucide-solid';

export default function Example() {
  return (
    <div class="flex flex-col items-stretch gap-4 overflow-x-auto">
      <FeatureCard
        class='w-56 shrink-0'
        variant='orange'
        size='sm'
        title='Small card'
        subtitle='Compact sidebar feature.'
        icon={Boxes}
      />

      <FeatureCard
        class='w-72 shrink-0'
        variant='orange'
        size='md'
        title='Medium card'
        subtitle='Balanced default layout.'
        icon={Boxes}
      />

      <FeatureCard
        class='w-96 shrink-0'
        variant='orange'
        size='lg'
        title='Large card'
        subtitle='Prominent landing-page feature.'
        icon={Boxes}
      />
    </div>
  );
}
