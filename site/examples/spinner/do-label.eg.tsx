import { Spinner } from '@webf/sprinkles';

export default function Example() {
  return (
    <div class='flex items-center gap-3 text-sm text-foreground-muted'>
      <Spinner size='s' label='Uploading hero.jpg' />
      Uploading hero.jpg…
    </div>
  );
}
