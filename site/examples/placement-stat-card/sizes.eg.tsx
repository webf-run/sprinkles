import { PlacementStatCard } from '@webf-run/sprinkles';
import { Medal } from 'lucide-solid';

export default function Example() {
  return (
    <div class='grid gap-4 sm:grid-cols-3'>
      <PlacementStatCard
        size='sm'
        icon={Medal}
        value='18'
        title='Small'
        subtitle='Compact result'
      />
      <PlacementStatCard
        size='md'
        icon={Medal}
        value='240'
        title='Medium'
        subtitle='Standard result'
      />
      <PlacementStatCard
        size='lg'
        icon={Medal}
        value='12k+'
        title='Large'
        subtitle='Featured result'
      />
    </div>
  );
}
