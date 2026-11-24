import { RangeSlider } from '@webf/sprinkles';

export default function Example() {
  return (
    <div class='grid w-full max-w-sm gap-5'>
      <RangeSlider
        size='s'
        label='Small'
        defaultValue={{ start: 30, end: 60 }}
      />
      <RangeSlider
        size='m'
        label='Medium'
        defaultValue={{ start: 30, end: 60 }}
      />
      <RangeSlider
        size='l'
        label='Large'
        defaultValue={{ start: 30, end: 60 }}
      />
      <RangeSlider
        size='xl'
        label='Extra large'
        defaultValue={{ start: 30, end: 60 }}
      />
    </div>
  );
}
