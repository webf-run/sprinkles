import { PlacementStatCard } from '@webf-run/sprinkles';
import { Building2, Handshake, MapPin } from 'lucide-solid';

export default function Example() {
  return (
    <div class='flex flex-col gap-4 md:flex-row'>
      <PlacementStatCard
        size='sm'
        variant='green'
        icon={Handshake}
        value='480'
        title='Partners'
        subtitle='Hiring network'
      />
      <PlacementStatCard
        size='md'
        variant='blue'
        effect='lift'
        icon={Building2}
        value='120'
        title='Employers'
        subtitle='This year'
      />
      <PlacementStatCard
        size='lg'
        variant='purple'
        effect='glow'
        icon={MapPin}
        value='32'
        title='Cities'
        subtitle='Alumni locations'
      />
    </div>
  );
}
