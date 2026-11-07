import { TextArea } from '@webf/sprinkles';

export default function Example() {
  return (
    <TextArea
      class='max-w-xs'
      label='Alt text'
      rows={2}
      defaultValue='Three students reading on the library steps in spring.'
    />
  );
}
