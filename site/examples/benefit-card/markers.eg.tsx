import { BenefitCard } from '@webf/sprinkles';
import Sparkles from 'lucide-solid/icons/sparkles';

export default function Example() {
  return (
    <BenefitCard
      class='max-w-sm'
      icon={Sparkles}
      iconBackground={false}
      iconClass='size-10'
      marker='dot'
      variant='accent'
      fillStyle='subtle'
      size='l'
      title='Holistic growth'
      bullets={[
        'Sports, arts and community service',
        'Student-led clubs',
        'Annual cultural festival',
      ]}
    />
  );
}
