import { Slider } from '@webf/sprinkles';

export default function Example() {
  return (
    <div class='grid w-full max-w-sm gap-6'>
      <Slider
        label='Balance'
        minValue={-50}
        maxValue={50}
        defaultValue={-20}
        fillOffset={0}
      />
      <Slider
        label='Amount'
        maxValue={150}
        step={5}
        defaultValue={50}
        fillOffset={75}
      />
    </div>
  );
}
