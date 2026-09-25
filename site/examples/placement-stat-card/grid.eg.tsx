import { PlacementStatCard } from '@webf-run/sprinkles';
import { Building2, GraduationCap, Handshake } from 'lucide-solid';

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
        icon={Building2}
        value='32'
        title='Cities'
        subtitle='Where alumni work'
      />
    </div>
  );
}
