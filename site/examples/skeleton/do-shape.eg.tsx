import { Skeleton } from '@webf/sprinkles';

export default function Example() {
  return (
    <div class='flex w-full flex-col gap-3'>
      <Skeleton shape='rect' class='h-28' />
      <Skeleton class='w-3/4' />
      <Skeleton lines={2} />
    </div>
  );
}
