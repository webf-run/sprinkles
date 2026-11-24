import { Slider } from '@webf/sprinkles';

export default function Example() {
  return (
    <Slider
      class='max-w-sm'
      label='Amount'
      maxValue={150}
      step={5}
      defaultValue={50}
    />
  );
}
