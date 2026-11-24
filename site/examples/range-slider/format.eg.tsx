import { RangeSlider } from '@webf/sprinkles';

export default function Example() {
  return (
    <div class='grid w-full max-w-sm gap-6'>
      <RangeSlider
        label='Budget'
        maxValue={1000}
        step={10}
        defaultValue={{ start: 200, end: 600 }}
        formatOptions={{
          style: 'currency',
          currency: 'USD',
          maximumFractionDigits: 0,
        }}
      />
      <RangeSlider
        label='Opacity'
        minValue={0}
        maxValue={1}
        step={0.05}
        defaultValue={{ start: 0.2, end: 0.8 }}
        formatOptions={{ style: 'percent' }}
      />
    </div>
  );
}
