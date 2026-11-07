import { NumberInput } from '@webf/sprinkles';

export default function Example() {
  return (
    <div class='grid w-full gap-4 sm:grid-cols-2'>
      <NumberInput label='Default' placeholder='0' />
      <NumberInput
        label='Invalid'
        defaultValue={250}
        max={200}
        invalid
        errorText='The hall seats 200 at most.'
      />
      <NumberInput label='Disabled' defaultValue={12} disabled />
      <NumberInput label='Read-only' defaultValue={12} readOnly />
    </div>
  );
}
