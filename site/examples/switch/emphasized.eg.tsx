import { Switch } from '@webf/sprinkles';

export default function Example() {
  return (
    <div class='grid gap-1'>
      <Switch label='Allow comments' defaultChecked />
      <Switch label='Show the announcement banner' defaultChecked emphasized />
    </div>
  );
}
