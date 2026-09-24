import { FeatureCard } from '@webf-run/sprinkles';
import { Layers, ShieldCheck } from 'lucide-solid';

export default function Example() {
  return (
    <div class='grid gap-4 md:grid-cols-2'>
      <FeatureCard
        title='Flexible composition'
        subtitle='Combine components to build richer sections.'
        icon={Layers}
      />
      <FeatureCard
        variant='muted'
        title='Accessible defaults'
        subtitle='Clear structure supports every visitor.'
        icon={ShieldCheck}
      />
    </div>
  );
}
