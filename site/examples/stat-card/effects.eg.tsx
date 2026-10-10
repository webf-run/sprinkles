import { StatCard } from '@webf/sprinkles';
import { Activity, Sparkles } from 'lucide-solid';

export default function Example() {
  return (
    <div class='grid grid-cols-2 gap-4'>
      <StatCard
        effect='lift'
        icon={Activity}
        value='24%'
        label='Lift on hover'
      />

      <StatCard
        effect='glow'
        icon={Sparkles}
        value='4.9'
        label='Glow on hover'
      />
    </div>
  );
}
