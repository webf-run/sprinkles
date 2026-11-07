import { Checkbox } from '@webf/sprinkles';

export default function Example() {
  return (
    <div class='grid gap-1'>
      <Checkbox label='Allow comments' defaultChecked />
      <Checkbox label='Feature on the home page' defaultChecked emphasized />
    </div>
  );
}
