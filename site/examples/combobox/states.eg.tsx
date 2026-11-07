import { Combobox } from '@webf/sprinkles';

import { Authors } from './authors';

export default function Example() {
  return (
    <div class='grid w-full gap-4 sm:grid-cols-2'>
      <Combobox label='Default' placeholder='Search authors' items={Authors} />
      <Combobox
        label='Invalid'
        placeholder='Search authors'
        items={Authors}
        invalid
        errorText='Choose who wrote this post.'
      />
      <Combobox
        label='Disabled'
        items={Authors}
        defaultValue='meera-nair'
        disabled
      />
      <Combobox
        label='Read-only'
        items={Authors}
        defaultValue='meera-nair'
        readOnly
      />
    </div>
  );
}
