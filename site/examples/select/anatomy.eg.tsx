import { Select } from '@webf/sprinkles';

const Statuses = [
  { label: 'Draft', value: 'draft' },
  { label: 'In review', value: 'review' },
  { label: 'Scheduled', value: 'scheduled' },
  { label: 'Published', value: 'published' },
  { label: 'Archived', value: 'archived' },
];

export default function Example() {
  return (
    <Select
      class='max-w-xs'
      label='Status'
      description='Only published pages are visible on the site.'
      items={Statuses}
      defaultValue='review'
    />
  );
}
