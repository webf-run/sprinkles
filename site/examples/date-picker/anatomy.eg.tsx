import { DatePicker } from '@webf/sprinkles';

export default function Example() {
  return (
    <DatePicker
      class='max-w-xs'
      label='Publish date'
      description='The post goes live at 09:00 site time.'
      defaultValue='2026-11-20'
      required
    />
  );
}
