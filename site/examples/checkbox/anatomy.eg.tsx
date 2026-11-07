import { Checkbox } from '@webf/sprinkles';

export default function Example() {
  return (
    <Checkbox
      class='max-w-sm'
      label='Show in the main navigation'
      description='Adds the page to the menu at the top of every page.'
      defaultChecked
    />
  );
}
