import { TextField } from '@webf/sprinkles';

export default function Example() {
  return (
    <TextField
      class='max-w-xs'
      label='Contact email'
      defaultValue='admissions@'
      invalid
      errorText='Enter a full address, like admissions@example.org.'
    />
  );
}
