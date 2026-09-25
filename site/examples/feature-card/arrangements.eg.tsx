import { FeatureCard } from '@webf-run/sprinkles';
import { BarChart3, Globe, Layers, ShieldCheck, Zap } from 'lucide-solid';

export default function Example() {
  return (
    <div class='flex flex-col gap-4'>
      <FeatureCard
        class='w-full'
        size='sm'
        variant='blue'
        title='Global Reach'
        subtitle='Connect with customers across every market.'
        icon={Globe}
      />

      <FeatureCard
        class='w-full'
        size='md'
        variant='purple'
        effect='lift'
        title='Composable Design'
        subtitle='Build flexible experiences with reusable components.'
        icon={Layers}
      />

      <FeatureCard
        class='w-full'
        size='lg'
        variant='orange'
        effect='glow'
        title='Lightning Fast'
        subtitle='Deliver fast and responsive experiences for every user.'
        icon={Zap}
      />

      <FeatureCard
        class='w-full'
        size='md'
        variant='green'
        effect='lift'
        title='Secure Platform'
        subtitle='Protect your data with reliable security features.'
        icon={ShieldCheck}
      />

      <FeatureCard
        class='w-full'
        size='lg'
        variant='neutral'
        title='Powerful Analytics'
        subtitle='Track performance and make informed decisions with meaningful insights.'
        icon={BarChart3}
      />
    </div>
  );
}
