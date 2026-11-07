import { IconButton } from '@webf/sprinkles';
import Plus from 'lucide-solid/icons/plus';
import Save from 'lucide-solid/icons/save';
import Settings from 'lucide-solid/icons/settings';
import Trash2 from 'lucide-solid/icons/trash-2';

export default function Example() {
  return (
    <>
      <IconButton
        fillStyle='outline'
        icon={Settings}
        aria-label='Page settings'
      />
      <IconButton
        fillStyle='outline'
        variant='accent'
        icon={Plus}
        aria-label='New page'
      />
      <IconButton
        fillStyle='outline'
        variant='primary'
        icon={Save}
        aria-label='Save draft'
      />
      <IconButton
        fillStyle='outline'
        variant='negative'
        icon={Trash2}
        aria-label='Delete page'
      />
    </>
  );
}
