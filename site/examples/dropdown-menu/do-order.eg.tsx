import { Button, DropdownMenu } from '@webf/sprinkles';
import Ellipsis from 'lucide-solid/icons/ellipsis';

export default function Example() {
  return (
    <DropdownMenu
      trigger={(props) => (
        <Button
          {...props}
          variant='secondary'
          fillStyle='outline'
          icon={Ellipsis}
          aria-label='Image actions'
        />
      )}
      items={[
        { value: 'replace', label: 'Replace' },
        { value: 'download', label: 'Download' },
        { value: 'copy', label: 'Copy URL' },
        { type: 'separator' },
        { value: 'delete', label: 'Delete', negative: true },
      ]}
    />
  );
}
