import { RangeSlider } from '@webf/sprinkles';

export default function Example() {
  return (
    <RangeSlider
      class='max-w-xs'
      label='Number of followers'
      maxValue={1000000}
      defaultValue={{ start: 100, end: 900000 }}
    />
  );
}
