import { StatCard } from '@webf-run/sprinkles';
import {
  ChartNoAxesCombined,
  CircleDollarSign,
  HeartPulse,
  Sparkles,
  Users,
} from 'lucide-solid';

export default function Example() {
  return (
    <div class='grid gap-4 sm:grid-cols-2 xl:grid-cols-5'>
      <StatCard
        variant='purple'
        icon={Users}
        value='12k'
        label='Community members'
      />
      <StatCard
        variant='orange'
        icon={CircleDollarSign}
        value='$42k'
        label='Monthly revenue'
      />
      <StatCard
        variant='green'
        icon={HeartPulse}
        value='98%'
        label='Wellness score'
      />
      <StatCard
        variant='blue'
        icon={ChartNoAxesCombined}
        value='8.4k'
        label='Product sessions'
      />
      <StatCard
        variant='neutral'
        icon={Sparkles}
        value='240'
        label='Published stories'
      />
    </div>
  );
}
