import { BenefitCard } from '@webf/sprinkles';
import GraduationCap from 'lucide-solid/icons/graduation-cap';

export default function Example() {
  return (
    <BenefitCard
      class='max-w-sm'
      icon={GraduationCap}
      title='Industry-ready curriculum'
      bullets={[
        'Updated every year with industry input',
        'Hands-on lab work from the first term',
        'Internships in the final year',
      ]}
    />
  );
}
