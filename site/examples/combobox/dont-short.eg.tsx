import { Combobox } from '@webf/sprinkles';

const Statuses = [
  { label: 'Draft', value: 'draft' },
  { label: 'Published', value: 'published' },
];

export default function Example() {
  return (
    <Combobox
      class='max-w-xs'
      label='Status'
      placeholder='Search statuses'
      items={Statuses}
    />
  );
}
