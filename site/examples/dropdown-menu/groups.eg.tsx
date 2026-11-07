import { Button, DropdownMenu } from '@webf/sprinkles';
import ChevronDown from 'lucide-solid/icons/chevron-down';
import Download from 'lucide-solid/icons/download';
import FilePlus from 'lucide-solid/icons/file-plus';
import Images from 'lucide-solid/icons/images';
import Link2 from 'lucide-solid/icons/link-2';

export default function Example() {
  return (
    <DropdownMenu
      trigger={(props) => (
        <Button {...props} iconEnd={ChevronDown}>
          New
        </Button>
      )}
      items={[
        {
          type: 'group',
          label: 'Create',
          items: [
            { value: 'page', label: 'Page', icon: FilePlus },
            { value: 'redirect', label: 'Redirect', icon: Link2 },
          ],
        },
        { type: 'separator' },
        {
          type: 'group',
          label: 'Media',
          items: [
            { value: 'upload', label: 'Upload images', icon: Images },
            { value: 'import', label: 'Import from URL', icon: Download },
          ],
        },
      ]}
    />
  );
}
