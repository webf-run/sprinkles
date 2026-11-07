import { Combobox } from '@webf/sprinkles';

import { Authors } from './authors';

export default function Example() {
  return (
    <div class='grid w-full max-w-xs gap-4'>
      <Combobox
        size='s'
        label='Small'
        items={Authors}
        defaultValue='grace-liu'
      />
      <Combobox
        size='m'
        label='Medium'
        items={Authors}
        defaultValue='grace-liu'
      />
      <Combobox
        size='l'
        label='Large'
        items={Authors}
        defaultValue='grace-liu'
      />
      <Combobox
        size='xl'
        label='Extra large'
        items={Authors}
        defaultValue='grace-liu'
      />
    </div>
  );
}
