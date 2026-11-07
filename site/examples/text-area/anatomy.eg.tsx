import { TextArea } from '@webf/sprinkles';

export default function Example() {
  return (
    <TextArea
      class='max-w-sm'
      label='Excerpt'
      description='Shown in post lists and when the post is shared.'
      defaultValue='Applications for the 2027 intake open on 1 December. Here is what to prepare, and the dates to keep in mind.'
      required
    />
  );
}
