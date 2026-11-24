import { Slider } from '@webf/sprinkles';

export default function Example() {
  return (
    <div class='grid w-full max-w-sm gap-6'>
      <Slider
        label='Budget'
        maxValue={1000}
        step={10}
        defaultValue={400}
        formatOptions={{
          style: 'currency',
          currency: 'USD',
          maximumFractionDigits: 0,
        }}
      />
      <Slider
        label='Opacity'
        minValue={0}
        maxValue={1}
        step={0.05}
        defaultValue={0.6}
        formatOptions={{ style: 'percent' }}
      />
    </div>
  );
}
