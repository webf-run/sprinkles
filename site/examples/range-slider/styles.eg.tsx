import { RangeSlider } from '@webf/sprinkles';

export default function Example() {
  return (
    <div class='grid w-full max-w-sm gap-6'>
      <RangeSlider
        label='Thin track, default thumb'
        defaultValue={{ start: 20, end: 70 }}
      />
      <RangeSlider
        label='Thick track'
        trackStyle='thick'
        defaultValue={{ start: 20, end: 70 }}
      />
      <RangeSlider
        label='Precise thumb'
        thumbStyle='precise'
        defaultValue={{ start: 20, end: 70 }}
      />
      <RangeSlider
        label='Emphasized'
        emphasized
        defaultValue={{ start: 20, end: 70 }}
      />
    </div>
  );
}
