import { Skeleton } from '@webf/sprinkles';

export default function Example() {
  return (
    <div
      aria-busy='true'
      class='flex w-80 items-start gap-4 rounded-2xl border border-border-muted p-4'
    >
      <Skeleton shape='circle' />
      <div class='flex flex-1 flex-col gap-3'>
        <Skeleton class='w-1/2' />
        <Skeleton lines={2} />
      </div>
    </div>
  );
}
