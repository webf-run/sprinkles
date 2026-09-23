import { Badge } from '@webf/sprinkles';

export default function Example() {
  return (
    <div class='flex flex-wrap items-center gap-3'>
      <Badge variant='green' class='gap-2'>
        <span class='bg-badge-green-foreground h-2 w-2 shrink-0 rounded-full'
        ></span>
        Online
      </Badge>

      <Badge variant='orange' class='gap-2'>
        <span class='bg-badge-orange-foreground h-2 w-2 shrink-0 rounded-full'
        ></span>
        Pending
      </Badge>

      <Badge variant='blue' class='gap-2'>
        <span class='bg-badge-blue-foreground h-2 w-2 shrink-0 rounded-full'></span>
        Processing
      </Badge>

      <Badge variant='neutral' class='gap-2'>
        <span class='bg-badge-neutral-foreground h-2 w-2 shrink-0 rounded-full'
        ></span>
        Offline
      </Badge>
    </div>
  );
}
