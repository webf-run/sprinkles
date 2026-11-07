import { StatCard } from '@webf/sprinkles';
import Briefcase from 'lucide-solid/icons/briefcase';
import Building2 from 'lucide-solid/icons/building-2';
import Users from 'lucide-solid/icons/users';

export default function Example() {
  return (
    <div class='flex w-full flex-wrap gap-4'>
      <StatCard icon={Users} value='1,200+' label='Students' />
      <StatCard
        icon={Briefcase}
        value='98%'
        label='Placement rate'
        variant='positive'
      />
      <StatCard
        icon={Building2}
        value='45'
        label='Recruiters'
        variant='informative'
      />
    </div>
  );
}
