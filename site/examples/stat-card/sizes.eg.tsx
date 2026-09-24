import { StatCard } from '@webf-run/sprinkles';
import { BarChart3 } from 'lucide-solid';

export default function Example() {
  return (
    <div class='flex flex-row items-stretch gap-4'>
      <StatCard size='sm' icon={BarChart3} value='18' label='Small metric' />

      <StatCard size='md' icon={BarChart3} value='240' label='Medium metric' />

      <StatCard
        size='lg'
        icon={BarChart3}
        value='12,000+'
        label='Large metric'
      />
    </div>
  );
}
