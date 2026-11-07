import { IconButton, Separator } from '@webf/sprinkles';
import Copy from 'lucide-solid/icons/copy';
import ExternalLink from 'lucide-solid/icons/external-link';
import Pencil from 'lucide-solid/icons/pencil';
import Trash2 from 'lucide-solid/icons/trash-2';

export default function Example() {
  return (
    <div
      class='flex h-10 items-center gap-1'
      role='toolbar'
      aria-label='Page actions'
    >
      <IconButton quiet icon={Pencil} aria-label='Edit page' />
      <IconButton quiet icon={Copy} aria-label='Duplicate page' />
      <IconButton quiet icon={ExternalLink} aria-label='Preview page' />
      <Separator orientation='vertical' class='mx-2 my-2' />
      <IconButton
        quiet
        variant='negative'
        icon={Trash2}
        aria-label='Delete page'
      />
    </div>
  );
}
