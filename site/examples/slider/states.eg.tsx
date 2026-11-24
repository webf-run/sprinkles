import { Slider } from '@webf/sprinkles';

export default function Example() {
  return (
    <div class='grid w-full gap-6 sm:grid-cols-2'>
      <Slider label='Default' defaultValue={40} />
      <Slider
        label='Invalid'
        invalid
        defaultValue={90}
        errorText='Keep the volume under 80.'
      />
      <Slider label='Disabled' disabled defaultValue={40} />
      <Slider label='Read-only' readOnly defaultValue={40} />
    </div>
  );
}
