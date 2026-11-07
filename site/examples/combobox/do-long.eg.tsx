import { Combobox } from '@webf/sprinkles';

import { Authors } from './authors';

export default function Example() {
  return (
    <Combobox
      class='max-w-xs'
      label='Author'
      placeholder='Search authors'
      items={Authors}
    />
  );
}
