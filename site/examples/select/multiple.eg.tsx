import { Select } from '@webf/sprinkles';

const Categories = [
  { label: 'News', value: 'news' },
  { label: 'Events', value: 'events' },
  { label: 'Admissions', value: 'admissions' },
  { label: 'Research', value: 'research' },
  { label: 'Campus life', value: 'campus-life' },
  { label: 'Alumni', value: 'alumni' },
];

export default function Example() {
  return (
    <Select
      class='max-w-xs'
      multiple
      label='Categories'
      placeholder='Choose categories'
      description='A post appears in every category you pick.'
      items={Categories}
      defaultValue={['news', 'events']}
    />
  );
}
