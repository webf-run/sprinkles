import { Skeleton } from '@webf/sprinkles';

export default function Example() {
  return (
    <div class='grid w-full grid-cols-1 items-start gap-8 sm:grid-cols-3'>
      <Skeleton lines={3} />
      <Skeleton shape='circle' class='size-12' />
      <Skeleton shape='rect' class='h-24' />
    </div>
  );
}
