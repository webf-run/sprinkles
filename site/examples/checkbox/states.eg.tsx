import { Checkbox } from '@webf/sprinkles';

export default function Example() {
  return (
    <div class='grid w-full gap-x-8 gap-y-2 sm:grid-cols-2'>
      <Checkbox label='Unchecked' />
      <Checkbox label='Checked' defaultChecked />
      <Checkbox label='Indeterminate' indeterminate />
      <Checkbox
        label='Invalid'
        required
        invalid
        errorText='Accept the guidelines to publish.'
      />
      <Checkbox label='Disabled' disabled />
      <Checkbox label='Disabled and checked' disabled defaultChecked />
      <Checkbox label='Read-only' readOnly />
      <Checkbox label='Read-only and checked' readOnly defaultChecked />
    </div>
  );
}
