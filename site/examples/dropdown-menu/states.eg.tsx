import { Button, DropdownMenu } from '@webf/sprinkles';
import ChevronDown from 'lucide-solid/icons/chevron-down';
import Clock from 'lucide-solid/icons/clock';
import Eye from 'lucide-solid/icons/eye';
import Send from 'lucide-solid/icons/send';
import Trash2 from 'lucide-solid/icons/trash-2';

export default function Example() {
  return (
    <DropdownMenu
      trigger={(props) => (
        <Button {...props} variant='secondary' iconEnd={ChevronDown}>
          Draft
        </Button>
      )}
      items={[
        { value: 'publish', label: 'Publish now', icon: Send },
        { value: 'schedule', label: 'Schedule…', icon: Clock },
        // A draft isn't live, so there is nothing to unpublish.
        { value: 'unpublish', label: 'Unpublish', icon: Eye, disabled: true },
        { type: 'separator' },
        {
          value: 'discard',
          label: 'Discard draft',
          icon: Trash2,
          negative: true,
        },
      ]}
    />
  );
}
