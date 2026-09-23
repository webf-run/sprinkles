import { BenefitCard } from '@webf/sprinkles';
import { ShieldCheck } from 'lucide-solid';

export default function Example() {
  return (
    <BenefitCard
      icon={ShieldCheck}
      title='Reliable by default'
      bullets={[
        'Accessible markup out of the box',
        'Consistent spacing across breakpoints',
        'Works with any color token set',
      ]}
    />
  );
}
