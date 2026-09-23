import { PlacementStatCard } from '@webf/sprinkles';
import { MousePointer2, Sparkles } from 'lucide-solid';

export default function Example() {
  return (
    <div class='grid gap-4 sm:grid-cols-2'>
      <PlacementStatCard
        effect='lift'
        icon={MousePointer2}
        value='92%'
        title='Lift'
        subtitle='Interactive outcome card'
      />
      <PlacementStatCard
        effect='glow'
        icon={Sparkles}
        value='98%'
        title='Glow'
        subtitle='Featured outcome card'
      />
    </div>
  );
}
