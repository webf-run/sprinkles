import { DatePicker } from '@webf/sprinkles';

export default function Example() {
  return (
    <div class='grid w-full max-w-xs gap-4'>
      <DatePicker size='s' label='Small' defaultValue='2026-11-20' />
      <DatePicker size='m' label='Medium' defaultValue='2026-11-20' />
      <DatePicker size='l' label='Large' defaultValue='2026-11-20' />
      <DatePicker size='xl' label='Extra large' defaultValue='2026-11-20' />
    </div>
  );
}
