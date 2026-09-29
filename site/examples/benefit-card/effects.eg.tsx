import { BenefitCard } from '@webf-run/sprinkles';
import { MousePointer2, Zap } from 'lucide-solid';

export default function Example() {
  return (
    <div class='grid gap-4 sm:grid-cols-2'>
      <BenefitCard
        effect='lift'
        icon={MousePointer2}
        title='Lift on hover'
        bullets={['Subtle elevation change', 'Signals interactivity']}
      />
      <BenefitCard
        effect='glow'
        icon={Zap}
        title='Glow on hover'
        bullets={['Soft primary-colored shadow', 'Good for CTA-adjacent cards']}
      />
    </div>
  );
}
