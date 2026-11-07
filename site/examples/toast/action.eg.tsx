import { Button } from '@webf/sprinkles';
import Trash2 from 'lucide-solid/icons/trash-2';
import { createSignal } from 'solid-js';

import { toaster } from './toaster';

export default function Example() {
  const [inTrash, setInTrash] = createSignal(false);

  const moveToTrash = () => {
    setInTrash(true);
    toaster.create({
      type: 'neutral',
      title: '“About us” moved to trash',
      action: { label: 'Undo', onClick: () => setInTrash(false) },
      duration: 8000,
    });
  };

  return (
    <>
      <Button
        variant='negative'
        fillStyle='outline'
        icon={Trash2}
        disabled={inTrash()}
        onClick={moveToTrash}
      >
        Move to trash
      </Button>
      <span class='text-sm text-foreground-muted'>
        {inTrash() ? 'In trash' : 'Published'}
      </span>
    </>
  );
}
