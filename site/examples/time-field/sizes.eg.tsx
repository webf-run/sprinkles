import { TimeField } from '@webf/sprinkles';

export default function Example() {
  return (
    <div class='grid w-full max-w-xs gap-4'>
      <TimeField size='s' label='Small' defaultValue='09:30' />
      <TimeField size='m' label='Medium' defaultValue='09:30' />
      <TimeField size='l' label='Large' defaultValue='09:30' />
      <TimeField size='xl' label='Extra large' defaultValue='09:30' />
    </div>
  );
}
