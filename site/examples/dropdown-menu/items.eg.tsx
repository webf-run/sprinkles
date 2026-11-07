import { Button, DropdownMenu } from '@webf/sprinkles';
import Archive from 'lucide-solid/icons/archive';
import Copy from 'lucide-solid/icons/copy';
import Ellipsis from 'lucide-solid/icons/ellipsis';
import ExternalLink from 'lucide-solid/icons/external-link';
import Pencil from 'lucide-solid/icons/pencil';
import Trash2 from 'lucide-solid/icons/trash-2';
import { createSignal } from 'solid-js';

export default function Example() {
  const [last, setLast] = createSignal('nothing yet');

  return (
    <div class='flex items-center gap-4'>
      <DropdownMenu
        onSelect={setLast}
        trigger={(props) => (
          <Button
            {...props}
            variant='secondary'
            fillStyle='outline'
            icon={Ellipsis}
            aria-label='More actions for “About us”'
          />
        )}
        items={[
          { value: 'edit', label: 'Edit', icon: Pencil, shortcut: 'E' },
          {
            value: 'duplicate',
            label: 'Duplicate',
            icon: Copy,
            shortcut: '⌘D',
          },
          { value: 'open', label: 'Open on website', icon: ExternalLink },
          { type: 'separator' },
          { value: 'archive', label: 'Archive', icon: Archive },
          { value: 'delete', label: 'Delete', icon: Trash2, negative: true },
        ]}
      />
      <span class='text-sm text-foreground-muted'>Chose: {last()}</span>
    </div>
  );
}
