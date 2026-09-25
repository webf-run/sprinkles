import { BenefitCard } from '@webf-run/sprinkles';
import {
  GraduationCap,
  Handshake,
  Heart,
  ShieldCheck,
  Trophy,
} from 'lucide-solid';

export default function Example() {
  return (
    <div class='grid gap-4 sm:grid-cols-2 xl:grid-cols-5'>
      <BenefitCard
        variant='purple'
        icon={GraduationCap}
        title='Learn faster'
        bullets={['Guided onboarding', 'Interactive examples']}
      />
      <BenefitCard
        variant='orange'
        icon={Trophy}
        title='Ship with confidence'
        bullets={['Battle-tested defaults', 'Production-ready markup']}
      />
      <BenefitCard
        variant='green'
        icon={Heart}
        title='Built to last'
        bullets={['Semantic HTML', 'Long-term maintainability']}
      />
      <BenefitCard
        variant='blue'
        icon={ShieldCheck}
        title='Secure foundations'
        bullets={['No inline scripts required', 'Framework agnostic markup']}
      />
      <BenefitCard
        variant='neutral'
        icon={Handshake}
        title='Team friendly'
        bullets={['Shared design tokens', 'Predictable prop API']}
      />
    </div>
  );
}
