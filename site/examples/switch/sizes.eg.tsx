import { Switch } from '@webf/sprinkles';

export default function Example() {
  return (
    <div class='grid gap-2'>
      <Switch size='s' label='Small' defaultChecked />
      <Switch size='m' label='Medium' defaultChecked />
      <Switch size='l' label='Large' defaultChecked />
      <Switch size='xl' label='Extra large' defaultChecked />
    </div>
  );
}
