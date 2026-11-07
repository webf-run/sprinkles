import { Combobox } from '@webf/sprinkles';
import { createSignal } from 'solid-js';

import { Authors } from './authors';

export default function Example() {
  const [author, setAuthor] = createSignal<string | null>('jose-alvarez');

  return (
    <div class='grid w-full max-w-xs gap-2'>
      <Combobox
        label='Author'
        placeholder='Search authors'
        items={Authors}
        value={author()}
        onValueChange={setAuthor}
        name='author'
      />
      <p class='m-0 text-sm text-foreground-muted'>
        Value: {author() ?? 'null'}
      </p>
    </div>
  );
}
