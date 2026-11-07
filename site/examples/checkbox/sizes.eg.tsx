import { Checkbox } from '@webf/sprinkles';

export default function Example() {
  return (
    <div class='grid gap-2'>
      <Checkbox size='s' label='Small' defaultChecked />
      <Checkbox size='m' label='Medium' defaultChecked />
      <Checkbox size='l' label='Large' defaultChecked />
      <Checkbox size='xl' label='Extra large' defaultChecked />
    </div>
  );
}
