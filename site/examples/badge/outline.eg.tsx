import { Badge } from '@webf-run/sprinkles';

export default function Example() {
  return (
    <div class='flex flex-wrap items-center gap-3'>
      <Badge class='border-primary text-primary border bg-transparent'>
        Primary
      </Badge>

      <Badge
        variant='orange'
        class='border-badge-orange-foreground border bg-transparent'
      >
        Warning
      </Badge>

      <Badge
        variant='green'
        class='border-badge-green-foreground border bg-transparent'
      >
        Success
      </Badge>

      <Badge
        variant='blue'
        class='border-badge-blue-foreground border bg-transparent'
      >
        Information
      </Badge>

      <Badge
        variant='neutral'
        class='border-badge-neutral-foreground border bg-transparent'
      >
        Neutral
      </Badge>
    </div>
  );
}
