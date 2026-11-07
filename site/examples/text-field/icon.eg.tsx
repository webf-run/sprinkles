import { TextField } from '@webf/sprinkles';
import Search from 'lucide-solid/icons/search';

export default function Example() {
  return (
    <TextField
      class='max-w-sm'
      type='search'
      icon={Search}
      aria-label='Search pages'
      placeholder='Search pages'
    />
  );
}
