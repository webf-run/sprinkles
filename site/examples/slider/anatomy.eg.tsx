import { Slider } from '@webf/sprinkles';

export default function Example() {
  return (
    <Slider
      class='max-w-sm'
      label='Cookies'
      description='How many to buy.'
      defaultValue={30}
    />
  );
}
