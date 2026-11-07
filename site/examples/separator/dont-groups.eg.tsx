import { Separator } from '@webf/sprinkles';

export default function Example() {
  return (
    <div class='flex w-full flex-col gap-2 text-sm text-foreground'>
      <span>Pages</span>
      <Separator />
      <span>Posts</span>
      <Separator />
      <span>Media</span>
      <Separator />
      <span>Settings</span>
    </div>
  );
}
