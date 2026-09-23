import { Badge } from '@webf/sprinkles';

export default function Example() {
  return (
    <div class='flex flex-wrap items-center gap-6'>
      <div class='inline-flex items-center gap-3'>
        <span class='text-foreground text-base font-medium'> Notifications </span>

        <Badge variant='orange' size='sm' class='min-w-7 justify-center px-2'>
          8
        </Badge>
      </div>

      <div class='inline-flex items-center gap-3'>
        <span class='text-foreground text-base font-medium'> Messages </span>

        <Badge variant='green' size='sm' class='min-w-7 justify-center px-2'>
          3
        </Badge>
      </div>
    </div>
  );
}
