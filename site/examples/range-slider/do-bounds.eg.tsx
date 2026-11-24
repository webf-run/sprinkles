import { RangeSlider } from '@webf/sprinkles';

export default function Example() {
  return (
    <RangeSlider
      class='max-w-xs'
      label='Price'
      maxValue={500}
      step={10}
      defaultValue={{ start: 100, end: 300 }}
      formatOptions={{
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 0,
      }}
    />
  );
}
