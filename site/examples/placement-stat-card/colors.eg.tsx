import { PlacementStatCard } from '@webf-run/sprinkles';
import {
  Award,
  BriefcaseBusiness,
  GraduationCap,
  HeartPulse,
  Trophy,
} from 'lucide-solid';

export default function Example() {
  return (
    <div class='grid gap-4 sm:grid-cols-2 xl:grid-cols-5'>
      <PlacementStatCard
        variant='purple'
        icon={GraduationCap}
        value='3.5k'
        title='Graduates'
        subtitle='Education outcomes'
      />
      <PlacementStatCard
        variant='orange'
        icon={BriefcaseBusiness}
        value='92%'
        title='Placement rate'
        subtitle='Career website'
      />
      <PlacementStatCard
        variant='green'
        icon={HeartPulse}
        value='4.9'
        title='Student rating'
        subtitle='Wellness program'
      />
      <PlacementStatCard
        variant='blue'
        icon={Award}
        value='Top 10'
        title='Career ranking'
        subtitle='Institutional result'
      />
      <PlacementStatCard
        variant='neutral'
        icon={Trophy}
        value='480'
        title='Partners'
        subtitle='Employer network'
      />
    </div>
  );
}
