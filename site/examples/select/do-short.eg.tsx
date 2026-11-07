import { Select } from '@webf/sprinkles';

const Statuses = [
  { label: 'Draft', value: 'draft' },
  { label: 'In review', value: 'review' },
  { label: 'Published', value: 'published' },
];

export default function Example() {
  return (
    <Select
      class='max-w-xs'
      label='Status'
      items={Statuses}
      defaultValue='draft'
    />
  );
}
