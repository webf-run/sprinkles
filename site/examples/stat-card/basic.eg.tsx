import { StatCard } from '@webf/sprinkles';
import { Users } from 'lucide-solid';

export default function Example() {
  return (
    <div class='max-w-56'>
      <StatCard icon={Users} value='12,000+' label='Active learners' />
    </div>
  );
}
