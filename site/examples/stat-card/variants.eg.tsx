import { StatCard } from '@webf/sprinkles';
import { ChartNoAxesCombined, TrendingUp } from 'lucide-solid';

export default function Example() {
  return (
    <div class='grid gap-4 sm:grid-cols-2'>
      <StatCard
        variant='purple'
        icon={TrendingUp}
        value='24%'
        label='Growth this quarter'
      />
      <StatCard
        variant='orange'
        icon={ChartNoAxesCombined}
        value='8.4k'
        label='Monthly visits'
      />
    </div>
  );
}
