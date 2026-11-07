import { Switch } from '@webf/sprinkles';

export default function Example() {
  return (
    <div class='grid w-full gap-x-8 gap-y-2 sm:grid-cols-2'>
      <Switch label='Off' />
      <Switch label='On' defaultChecked />
      <Switch label='Disabled' disabled />
      <Switch label='Disabled and on' disabled defaultChecked />
      <Switch label='Read-only' readOnly />
      <Switch label='Read-only and on' readOnly defaultChecked />
    </div>
  );
}
