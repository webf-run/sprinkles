import { TextField } from '@webf/sprinkles';

export default function Example() {
  return (
    <TextField
      class='max-w-xs'
      type='email'
      label='Contact email'
      autocomplete='email'
    />
  );
}
