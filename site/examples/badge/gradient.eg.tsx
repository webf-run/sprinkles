import { Badge } from '@webf/sprinkles';

export default function Example() {
  return (
    <div class='flex flex-wrap items-center gap-3'>
      <Badge class='border-0 bg-linear-to-r from-purple-600 to-pink-500 text-white'>
        Purple Gradient
      </Badge>

      <Badge class='border-0 bg-linear-to-r from-orange-500 to-red-500 text-white'>
        Sunset Gradient
      </Badge>

      <Badge class='border-0 bg-linear-to-r from-blue-500 to-cyan-500 text-white'>
        Ocean Gradient
      </Badge>
    </div>
  );
}
