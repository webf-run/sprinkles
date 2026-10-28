import { PlacementStatCard } from '@webf/sprinkles';
import { BuildingComplex, GraduationCap, Handshake } from 'lucide-solid';

export default function Example() {
  return (
    <div class='grid gap-4 sm:grid-cols-2 xl:grid-cols-3'>
      <PlacementStatCard
        icon={GraduationCap}
        value='3,500+'
        title='Graduates'
        subtitle='Across every program'
      />
      <PlacementStatCard
        icon={Handshake}
        value='480'
        title='Partners'
        subtitle='Hiring our students'
      />
      <PlacementStatCard
        icon={BuildingComplex}
        value='32'
        title='Cities'
        subtitle='Where alumni work'
      />
    </div>
  );
}
