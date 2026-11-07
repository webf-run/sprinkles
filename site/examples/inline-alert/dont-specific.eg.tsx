import { InlineAlert } from '@webf/sprinkles';

export default function Example() {
  return (
    <InlineAlert variant='negative' heading='Error' class='w-full'>
      Something went wrong.
    </InlineAlert>
  );
}
