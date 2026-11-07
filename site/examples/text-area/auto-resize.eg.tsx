import { TextArea } from '@webf/sprinkles';

export default function Example() {
  return (
    <TextArea
      class='max-w-sm'
      label='Notes for reviewers'
      description='Grows as you type.'
      rows={2}
      autoResize
      placeholder='What changed, and what should reviewers check?'
    />
  );
}
