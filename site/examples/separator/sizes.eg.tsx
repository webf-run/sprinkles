import { Separator } from '@webf/sprinkles';

export default function Example() {
  return (
    <div class='flex w-full flex-col gap-6 text-sm text-foreground-muted'>
      <div class='flex flex-col gap-2'>
        <span>Small: 1 px, between items</span>
        <Separator size='s' />
      </div>
      <div class='flex flex-col gap-2'>
        <span>Medium: 2 px, between groups</span>
        <Separator size='m' />
      </div>
      <div class='flex flex-col gap-2'>
        <span>Large: 4 px, under a page or section title</span>
        <Separator size='l' />
      </div>
    </div>
  );
}
