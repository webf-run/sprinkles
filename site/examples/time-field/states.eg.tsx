import { TimeField } from '@webf/sprinkles';

export default function Example() {
  return (
    <div class='grid w-full gap-4 sm:grid-cols-2'>
      <TimeField label='Default' />
      <TimeField
        label='Invalid'
        defaultValue='12:30'
        invalid
        errorText='Choose a time when the clinic is open.'
      />
      <TimeField label='Disabled' defaultValue='11:00' disabled />
      <TimeField label='Read-only' defaultValue='10:15' readOnly />
    </div>
  );
}
