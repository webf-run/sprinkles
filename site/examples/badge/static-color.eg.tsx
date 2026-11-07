import { Badge } from '@webf/sprinkles';
import Sparkles from 'lucide-solid/icons/sparkles';

export default function Example() {
  return (
    <div class='flex w-full flex-wrap gap-3 rounded-2xl bg-surface-inverse p-6'>
      <Badge staticColor='white' fillStyle='subtle' icon={Sparkles}>
        Since 2008
      </Badge>
      <Badge staticColor='white' fillStyle='bold'>
        Bold
      </Badge>
      <Badge staticColor='white' fillStyle='outline'>
        Outline
      </Badge>
    </div>
  );
}
