import { Separator } from '@webf/sprinkles';

export default function Example() {
  return (
    <div class='flex w-full flex-col gap-2 text-sm text-foreground'>
      <span>Pages</span>
      <span>Posts</span>
      <span>Media</span>
      <Separator class='my-1' />
      <span>Settings</span>
    </div>
  );
}
