import { Slider } from '@webf/sprinkles';

export default function Example() {
  return (
    <div class='grid w-full max-w-sm gap-5'>
      <Slider size='s' label='Small' defaultValue={40} />
      <Slider size='m' label='Medium' defaultValue={40} />
      <Slider size='l' label='Large' defaultValue={40} />
      <Slider size='xl' label='Extra large' defaultValue={40} />
    </div>
  );
}
