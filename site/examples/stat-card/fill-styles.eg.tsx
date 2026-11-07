import { StatCard } from '@webf/sprinkles';
import Award from 'lucide-solid/icons/award';

export default function Example() {
  return (
    <div class='flex w-full flex-wrap gap-4'>
      <StatCard icon={Award} value='25' label='Years' fillStyle='outline' />
      <StatCard icon={Award} value='25' label='Years' fillStyle='subtle' />
      <StatCard icon={Award} value='25' label='Years' fillStyle='bold' />
    </div>
  );
}
