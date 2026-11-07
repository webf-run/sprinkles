import { NumberInput } from '@webf/sprinkles';

export default function Example() {
  return (
    <NumberInput
      class='max-w-xs'
      label='Event capacity (seats)'
      defaultValue={180}
      min={1}
    />
  );
}
