import { Button, InlineAlert } from '@webf/sprinkles';

export default function Example() {
  return (
    <InlineAlert
      variant='notice'
      heading='Asha Rao is also editing this page'
      actions={
        <Button size='s' variant='secondary'>
          See her changes
        </Button>
      }
      class='w-full'
    >
      If you both save, the second save asks which version to keep.
    </InlineAlert>
  );
}
