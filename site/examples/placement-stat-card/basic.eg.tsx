import { PlacementStatCard } from '@webf-run/sprinkles';
import { BriefcaseBusiness } from 'lucide-solid';

export default function Example() {
  return (
    <PlacementStatCard
      size='md'
      icon={BriefcaseBusiness}
      value='92%'
      title='Placement rate'
      subtitle='Within six months of graduation'
    />
  );
}
