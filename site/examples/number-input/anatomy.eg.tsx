import { NumberInput } from '@webf/sprinkles';

export default function Example() {
  return (
    <NumberInput
      class='max-w-xs'
      label='Sort order'
      description='Lower numbers come first in the menu.'
      defaultValue={10}
      min={0}
      step={10}
    />
  );
}
