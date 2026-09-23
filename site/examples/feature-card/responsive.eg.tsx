import { FeatureCard } from '@webf/sprinkles';
import { MonitorSmartphone } from 'lucide-solid';

export default function Example() {
  return (
    <FeatureCard
      class='md:max-w-lg'
      title='Responsive by default'
      subtitle='Spacing and typography adapt cleanly from phones to desktop.'
      icon={MonitorSmartphone}
    />
  );
}
