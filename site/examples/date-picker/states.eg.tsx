import { DatePicker } from '@webf/sprinkles';

export default function Example() {
  return (
    <div class='grid w-full gap-4 sm:grid-cols-2'>
      <DatePicker label='Default' />
      <DatePicker
        label='Invalid'
        defaultValue='2025-01-10'
        invalid
        errorText='Choose a date in the future.'
      />
      <DatePicker label='Disabled' defaultValue='2026-11-20' disabled />
      <DatePicker label='Read-only' defaultValue='2026-11-20' readOnly />
    </div>
  );
}
