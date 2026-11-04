import { Badge } from '@webf/sprinkles';

export default function Example() {
  return (
    <div class='flex flex-wrap items-center gap-3'>
      <Badge class='border-primary text-primary border bg-transparent'>
        Primary
      </Badge>

      <Badge
        variant='orange'
        class='border-orange-540 border bg-transparent'
      >
        Warning
      </Badge>

      <Badge
        variant='green'
        class='border-green-530 border bg-transparent'
      >
        Success
      </Badge>

      <Badge
        variant='blue'
        class='border-blue-610 border bg-transparent'
      >
        Information
      </Badge>

      <Badge
        variant='neutral'
        class='border-neutral-650 border bg-transparent'
      >
        Neutral
      </Badge>
    </div>
  );
}
