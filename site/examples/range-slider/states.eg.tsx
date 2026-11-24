import { RangeSlider } from '@webf/sprinkles';

export default function Example() {
  return (
    <div class='grid w-full gap-6 sm:grid-cols-2'>
      <RangeSlider label='Default' defaultValue={{ start: 30, end: 60 }} />
      <RangeSlider
        label='Invalid'
        invalid
        errorText='Pick a range under 50.'
        defaultValue={{ start: 30, end: 90 }}
      />
      <RangeSlider
        label='Disabled'
        disabled
        defaultValue={{ start: 30, end: 60 }}
      />
      <RangeSlider
        label='Read-only'
        readOnly
        defaultValue={{ start: 30, end: 60 }}
      />
    </div>
  );
}
