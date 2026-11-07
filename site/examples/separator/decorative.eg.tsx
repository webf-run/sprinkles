import { Separator } from '@webf/sprinkles';

export default function Example() {
  return (
    <div class='flex w-full max-w-md flex-col gap-3'>
      <h3 class='m-0 text-lg font-semibold text-foreground-strongest'>
        Domains
      </h3>
      <Separator size='l' decorative />
      <p class='m-0 text-sm text-foreground'>
        foundation.example.org is connected and verified.
      </p>
    </div>
  );
}
