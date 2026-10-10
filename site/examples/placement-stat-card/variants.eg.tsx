import { PlacementStatCard } from '@webf/sprinkles';
import { Star, Trophy } from 'lucide-solid';

export default function Example() {
  return (
    <div class='grid gap-4 sm:grid-cols-2'>
      <PlacementStatCard
        icon={Trophy}
        value='4.9/5'
        title='Student rating'
        subtitle='Based on recent reviews'
      />
      <PlacementStatCard
        variant='accent'
        icon={Star}
        value='Top 10'
        title='Career outcomes'
        subtitle='In our category'
      />
    </div>
  );
}
