import { DotTag } from '@webf-run/sprinkles';

export default function Example() {
  return (
    <div class='w-full'>
      <div class='flex flex-wrap gap-2'><DotTag class='!gap-1.5 !p-1.5 !text-xs' label='New' /><DotTag class='!gap-1.5 !p-1.5 !text-xs' label='Updated' /></div>
    </div>
  );
}
