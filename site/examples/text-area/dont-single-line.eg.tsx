import { TextArea } from '@webf/sprinkles';

export default function Example() {
  return (
    <TextArea
      class='max-w-xs'
      label='Page title'
      rows={4}
      defaultValue='Library opening hours'
    />
  );
}
