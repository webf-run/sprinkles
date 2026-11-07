import { DatePicker } from '@webf/sprinkles';

export default function Example() {
  return (
    <DatePicker
      class='max-w-xs'
      label='Application deadline'
      description='Between 1 December 2026 and 31 January 2027.'
      min='2026-12-01'
      max='2027-01-31'
      defaultValue='2027-01-15'
    />
  );
}
