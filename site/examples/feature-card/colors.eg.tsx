import { FeatureCard } from '@webf-run/sprinkles';
import {
  Heart,
  Palette,
  ShieldCheck,
  Sparkles,
  WandSparkles,
} from 'lucide-solid';

export default function Example() {
  return (
    <div class='grid gap-4 sm:grid-cols-2 xl:grid-cols-5'>
      <FeatureCard
        variant='purple'
        title='Creative'
        subtitle='Portfolio highlights.'
        icon={WandSparkles}
      />
      <FeatureCard
        variant='orange'
        title='Commerce'
        subtitle='Campaign promotion.'
        icon={Sparkles}
      />
      <FeatureCard
        variant='green'
        title='Wellness'
        subtitle='Progress update.'
        icon={Heart}
      />
      <FeatureCard
        variant='blue'
        title='SaaS'
        subtitle='Product capability.'
        icon={ShieldCheck}
      />
      <FeatureCard
        variant='neutral'
        title='Editorial'
        subtitle='Supporting content.'
        icon={Palette}
      />
    </div>
  );
}
