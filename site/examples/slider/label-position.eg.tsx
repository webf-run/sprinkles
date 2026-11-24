import { Slider } from '@webf/sprinkles';

export default function Example() {
  return (
    <div class='grid w-full max-w-md gap-6'>
      <Slider label='Top' labelPosition='top' defaultValue={30} />
      <Slider label='Side' labelPosition='side' defaultValue={30} />
    </div>
  );
}
