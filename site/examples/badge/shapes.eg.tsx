import { Badge } from '@webf-run/sprinkles';

export default function Example() {
  return (
    <div class='flex flex-wrap items-center gap-4'>
      <Badge class='rounded-full'> Pill Badge </Badge>

      <Badge class='rounded-lg'> Rounded Badge </Badge>

      <Badge class='rounded-md'> Square Badge </Badge>

      <Badge class='rounded-none'> Sharp Badge </Badge>
    </div>
  );
}
