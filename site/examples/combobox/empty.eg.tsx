import { Combobox } from '@webf/sprinkles';

const Tags = [
  { label: 'Scholarships', value: 'scholarships' },
  { label: 'Sports', value: 'sports' },
  { label: 'Student union', value: 'student-union' },
  { label: 'Sustainability', value: 'sustainability' },
];

export default function Example() {
  return (
    <Combobox
      class='max-w-xs'
      label='Tag'
      placeholder='Search tags'
      items={Tags}
      emptyText='No tag matches. Ask an editor to add it.'
    />
  );
}
