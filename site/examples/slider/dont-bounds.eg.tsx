import { Slider } from '@webf/sprinkles';

export default function Example() {
  return (
    <Slider
      class='max-w-xs'
      label='Number of followers'
      maxValue={1000000}
      defaultValue={250000}
    />
  );
}
