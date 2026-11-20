import { TimeField } from '@webf/sprinkles';

export default function Example() {
  return (
    <div class='grid w-full max-w-sm gap-4'>
      <TimeField label='Default' defaultValue='09:30' />
      <TimeField label='Required' required description='A time is required.' />
      <TimeField label='Read only' readOnly defaultValue='10:15' />
      <TimeField label='Disabled' disabled defaultValue='11:00' />
      <TimeField label='Invalid' invalid errorText='Choose a valid appointment time.' defaultValue='12:30' />
    </div>
  );
}
