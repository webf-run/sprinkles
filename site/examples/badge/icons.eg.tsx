import { Badge } from '@webf-run/sprinkles';
import { Check, Clock, Info, X } from 'lucide-solid';

export default function Example() {
  return (
    <div class='flex flex-wrap items-center gap-3'>
      <Badge variant='green' class='gap-1.5'>
        <Check class='h-4 w-4 shrink-0' />
        Verified
      </Badge>

      <Badge variant='orange' class='gap-1.5'>
        <Clock class='h-4 w-4 shrink-0' />
        Pending
      </Badge>

      <Badge variant='blue' class='gap-1.5'>
        <Info class='h-4 w-4 shrink-0' />
        Information
      </Badge>

      <Badge variant='neutral' class='gap-1.5'>
        <X class='h-4 w-4 shrink-0' />
        Cancelled
      </Badge>
    </div>
  );
}
