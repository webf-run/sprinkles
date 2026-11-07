import { Separator } from '@webf/sprinkles';

export default function Example() {
  return (
    <div class='flex w-full max-w-sm flex-col gap-3 text-sm text-foreground'>
      <p class='m-0'>Pages are reviewed before publishing.</p>
      <Separator />
      <p class='m-0'>Posts go live straight away.</p>
    </div>
  );
}
