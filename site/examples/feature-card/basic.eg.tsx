import { FeatureCard } from '@webf/sprinkles';
import { Sparkles } from 'lucide-solid';

export default function Example() {
  return (
    <FeatureCard
      title='Built for speed'
      subtitle='Ship polished interfaces with reusable Astro components.'
      icon={Sparkles}
    />
  );
}
