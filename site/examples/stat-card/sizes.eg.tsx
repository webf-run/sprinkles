import { StatCard } from '@webf/sprinkles';
import { ChartColumn } from 'lucide-solid';

export default function Example() {
  return (
    <div class='flex flex-row items-stretch gap-4'>
      <StatCard size='sm' icon={ChartColumn} value='18' label='Small metric' />

      <StatCard size='md' icon={ChartColumn} value='240' label='Medium metric' />

      <StatCard
        size='lg'
        icon={ChartColumn}
        value='12,000+'
        label='Large metric'
      />
    </div>
  );
}
