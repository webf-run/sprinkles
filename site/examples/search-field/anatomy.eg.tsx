import { SearchField } from '@webf/sprinkles';

export default function Example() {
  return (
    <SearchField
      class='max-w-sm'
      label='Search'
      description='Search by title or author.'
      defaultValue='annual report'
    />
  );
}
