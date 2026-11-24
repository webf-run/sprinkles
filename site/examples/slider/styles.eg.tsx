import { Slider } from '@webf/sprinkles';

export default function Example() {
  return (
    <div class='grid w-full max-w-sm gap-6'>
      <Slider label='Thin track, default thumb' defaultValue={40} />
      <Slider label='Thick track' trackStyle='thick' defaultValue={40} />
      <Slider label='Precise thumb' thumbStyle='precise' defaultValue={40} />
      <Slider label='Emphasized' emphasized defaultValue={40} />
    </div>
  );
}
