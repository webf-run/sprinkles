import { Separator } from '@webf/sprinkles';

export default function Example() {
  return (
    <section class='flex w-full max-w-md flex-col gap-4 text-sm text-foreground'>
      <div class='flex items-center justify-between'>
        <span>Time zone</span>
        <span class='text-foreground-muted'>Asia/Kolkata</span>
      </div>
      <Separator />
      <div class='flex items-center justify-between'>
        <span>Default language</span>
        <span class='text-foreground-muted'>English</span>
      </div>
      <Separator />
      <div class='flex items-center justify-between'>
        <span>Review before publishing</span>
        <span class='text-foreground-muted'>Pages only</span>
      </div>
    </section>
  );
}
