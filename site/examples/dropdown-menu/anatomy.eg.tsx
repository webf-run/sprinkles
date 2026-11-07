import { Button, DropdownMenu } from '@webf/sprinkles';
import ChevronDown from 'lucide-solid/icons/chevron-down';
import Copy from 'lucide-solid/icons/copy';
import Eye from 'lucide-solid/icons/eye';
import FolderInput from 'lucide-solid/icons/folder-input';
import Trash2 from 'lucide-solid/icons/trash-2';

export default function Example() {
  return (
    <DropdownMenu
      trigger={(props) => (
        <Button {...props} variant='secondary' iconEnd={ChevronDown}>
          Page actions
        </Button>
      )}
      items={[
        {
          type: 'group',
          label: 'Admissions 2027',
          items: [
            { value: 'preview', label: 'Preview', icon: Eye, shortcut: '⌘P' },
            {
              value: 'duplicate',
              label: 'Duplicate',
              icon: Copy,
              shortcut: '⌘D',
            },
            { value: 'move', label: 'Move to…', icon: FolderInput },
          ],
        },
        { type: 'separator' },
        { value: 'delete', label: 'Delete', icon: Trash2, negative: true },
      ]}
    />
  );
}
