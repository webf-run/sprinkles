import { TextField } from '@webf/sprinkles';

export default function Example() {
  return (
    <TextField
      class='max-w-sm'
      label='Page title'
      description='Shown in the browser tab and in search results.'
      required
      defaultValue='Admissions 2027'
    />
  );
}
