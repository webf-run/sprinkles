import { TextField } from '@webf/sprinkles';

export default function Example() {
  return (
    <TextField
      class='max-w-sm'
      label='Slug'
      description='The last part of the page’s address.'
      defaultValue='Campus Open Day!'
      invalid
      errorText='Use lowercase letters, numbers and hyphens only.'
    />
  );
}
