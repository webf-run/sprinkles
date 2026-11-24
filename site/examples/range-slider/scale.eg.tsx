import { RangeSlider } from '@webf/sprinkles';

export default function Example() {
  return (
    <RangeSlider
      class='max-w-sm'
      label='Amount'
      maxValue={150}
      step={5}
      defaultValue={{ start: 25, end: 125 }}
    />
  );
}
