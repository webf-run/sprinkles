import { FeatureCard } from '@webf-run/sprinkles';
import { MousePointer2, Sparkles } from 'lucide-solid';

export default function Example() {
  return (
    <div class='grid gap-4 sm:grid-cols-2'>
      <FeatureCard
        effect='lift'
        title='Lift on hover'
        subtitle='Good for interactive feature lists.'
        icon={MousePointer2}
      />
      <FeatureCard
        variant='green'
        effect='glow'
        title='Glow on hover'
        subtitle='Adds a subtle call to action.'
        icon={Sparkles}
      />
    </div>
  );
}
