import { TextField } from '@webf/sprinkles';

export default function Example() {
  return (
    <TextField
      class='max-w-sm'
      label='Slug'
      description='The last part of the page’s address: /news/campus-open-day.'
      defaultValue='campus-open-day'
    />
  );
}
