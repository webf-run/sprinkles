import { TextField } from '@webf/sprinkles';
import Link from 'lucide-solid/icons/link';

export default function Example() {
  return (
    <TextField
      class='max-w-sm'
      label='Slug'
      icon={Link}
      description='Lowercase letters, numbers and hyphens.'
      defaultValue='spring-concert-2027'
      required
    />
  );
}
