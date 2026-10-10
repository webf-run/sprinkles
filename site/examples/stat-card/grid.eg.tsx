import { StatCard } from '@webf/sprinkles';
import { Award, BookOpen, Users } from 'lucide-solid';

export default function Example() {
  return (
    <div class='grid gap-4 sm:grid-cols-2 xl:grid-cols-3'>
      <StatCard icon={Users} value='12,000+' label='Active learners' />
      <StatCard icon={BookOpen} value='240' label='Courses available' />
      <StatCard icon={Award} value='98%' label='Completion rate' />
    </div>
  );
}
