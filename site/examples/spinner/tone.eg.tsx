import { Spinner } from '@webf/sprinkles';

export default function Example() {
  return (
    <div class='flex w-full flex-wrap gap-6'>
      <div class='flex flex-1 items-center gap-3 rounded-2xl p-6'>
        <Spinner label='Loading media' />
        <span class='text-sm text-foreground-muted'>accent</span>
      </div>
      <div class='flex flex-1 items-center gap-3 rounded-2xl p-6 text-negative'>
        <Spinner tone='current' label='Deleting' />
        <span class='text-sm'>current</span>
      </div>
      <div class='flex flex-1 items-center gap-3 rounded-2xl bg-surface-inverse p-6 text-foreground-inverse'>
        <Spinner staticColor='white' label='Loading' />
        <span class='text-sm'>staticColor white</span>
      </div>
    </div>
  );
}
