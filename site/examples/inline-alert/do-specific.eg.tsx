import { Button, InlineAlert } from '@webf/sprinkles';

export default function Example() {
  return (
    <InlineAlert
      variant='negative'
      heading='The slug “about” is taken'
      actions={
        <Button size='s' variant='secondary'>
          Change slug
        </Button>
      }
      class='w-full'
    >
      Another page already uses /about. Choose a different slug to publish.
    </InlineAlert>
  );
}
