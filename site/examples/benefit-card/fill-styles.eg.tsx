import { BenefitCard } from '@webf/sprinkles';
import BuildingComplex from 'lucide-solid/icons/building-complex';
import GraduationCap from 'lucide-solid/icons/graduation-cap';
import HeartHandshake from 'lucide-solid/icons/heart-handshake';

export default function Example() {
  return (
    <div class='grid w-full gap-4 @md:grid-cols-2 @3xl:grid-cols-3'>
      <BenefitCard
        icon={GraduationCap}
        title='Curriculum'
        bullets={['Updated every year', 'Hands-on labs']}
      />
      <BenefitCard
        icon={BuildingComplex}
        title='Campus'
        variant='highlight'
        fillStyle='subtle'
        bullets={['Residential halls', 'Library open late']}
      />
      <BenefitCard
        icon={HeartHandshake}
        title='Mentoring'
        fillStyle='bold'
        bullets={['A mentor for every student', 'Weekly office hours']}
      />
    </div>
  );
}
