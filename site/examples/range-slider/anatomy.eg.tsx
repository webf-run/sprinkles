import { RangeSlider } from '@webf/sprinkles';

export default function Example() {
  return (
    <RangeSlider
      class='max-w-sm'
      label='Price range'
      defaultValue={{ start: 30, end: 60 }}
    />
  );
}
