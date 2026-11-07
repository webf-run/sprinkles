import { Button, EmptyState } from '@webf/sprinkles';
import Link2 from 'lucide-solid/icons/link-2';

export default function Example() {
  return (
    <EmptyState
      size='s'
      icon={Link2}
      heading='No redirects'
      description='Add one when you rename or move a page, so old links keep working.'
      actions={<Button size='s'>Add redirect</Button>}
      class='w-full'
    />
  );
}
