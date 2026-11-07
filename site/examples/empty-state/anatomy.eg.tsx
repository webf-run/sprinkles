import { Button, EmptyState } from '@webf/sprinkles';
import FileText from 'lucide-solid/icons/file-text';
import Plus from 'lucide-solid/icons/plus';

export default function Example() {
  return (
    <EmptyState
      icon={FileText}
      heading='No pages yet'
      description='Pages you create appear here. Start with the home page; you can add more any time.'
      actions={<Button icon={Plus}>New page</Button>}
      class='w-full'
    />
  );
}
