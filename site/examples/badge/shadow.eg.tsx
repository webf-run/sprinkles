import { Badge } from '@webf/sprinkles';

export default function Example() {
  return (
    <div class='flex flex-wrap items-center gap-3'>
      <Badge class='shadow-sm'> Subtle Shadow </Badge>

      <Badge variant='orange' class='shadow-md'> Medium Shadow </Badge>

      <Badge variant='purple' class='shadow-lg'> Large Shadow </Badge>
    </div>
  );
}
