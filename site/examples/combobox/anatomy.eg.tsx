import { Combobox } from '@webf/sprinkles';

import { Authors } from './authors';

export default function Example() {
  return (
    <Combobox
      class='max-w-xs'
      label='Author'
      placeholder='Search authors'
      description='Type part of a name to filter the list.'
      items={Authors}
    />
  );
}
