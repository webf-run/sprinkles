import { Badge } from '@webf/sprinkles';

export default function Example() {
  return (
    <div class='flex flex-wrap items-center gap-3'>
      <Badge variant='green' class='gap-2'>
        <span class='bg-green-530 h-2 w-2 shrink-0 rounded-full'></span>
        Online
      </Badge>

      <Badge variant='orange' class='gap-2'>
        <span class='bg-orange-540 h-2 w-2 shrink-0 rounded-full'></span>
        Pending
      </Badge>

      <Badge variant='blue' class='gap-2'>
        <span class='bg-blue-610 h-2 w-2 shrink-0 rounded-full'></span>
        Processing
      </Badge>

      <Badge variant='neutral' class='gap-2'>
        <span class='bg-neutral-650 h-2 w-2 shrink-0 rounded-full'></span>
        Offline
      </Badge>
    </div>
  );
}
