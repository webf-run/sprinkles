import { NumberInput } from '@webf/sprinkles';

export default function Example() {
  return (
    <div class='grid w-full max-w-xs gap-4'>
      <NumberInput size='s' label='Small' defaultValue={120} />
      <NumberInput size='m' label='Medium' defaultValue={120} />
      <NumberInput size='l' label='Large' defaultValue={120} />
      <NumberInput size='xl' label='Extra large' defaultValue={120} />
    </div>
  );
}
