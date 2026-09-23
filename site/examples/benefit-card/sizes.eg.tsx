import { BenefitCard } from '@webf/sprinkles';
import { Sparkles } from 'lucide-solid';

export default function Example() {
  return (
    <div class="grid gap-4 md:grid-cols-3">
      <BenefitCard
        size='sm'
        variant='muted'
        icon={Sparkles}
        title='Compact'
        bullets={['Fits tight layouts', 'Two-line bullets']}
      />
      <BenefitCard
        size='md'
        variant='muted'
        icon={Sparkles}
        title='Default'
        bullets={['Balanced spacing', 'Works in most grids']}
      />
      <BenefitCard
        size='lg'
        variant='muted'
        icon={Sparkles}
        title='Spacious'
        bullets={['Generous padding', 'Good for hero sections']}
      />
    </div>
  );
}
