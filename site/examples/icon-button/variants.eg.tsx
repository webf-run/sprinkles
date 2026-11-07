import { IconButton } from '@webf/sprinkles';
import Plus from 'lucide-solid/icons/plus';
import Save from 'lucide-solid/icons/save';
import Settings from 'lucide-solid/icons/settings';
import Sparkles from 'lucide-solid/icons/sparkles';
import Trash2 from 'lucide-solid/icons/trash-2';

export default function Example() {
  return (
    <>
      <IconButton icon={Settings} aria-label='Page settings' />
      <IconButton variant='accent' icon={Plus} aria-label='New page' />
      <IconButton variant='primary' icon={Save} aria-label='Save draft' />
      <IconButton variant='negative' icon={Trash2} aria-label='Delete page' />
      <IconButton variant='highlight' icon={Sparkles} aria-label='What’s new' />
    </>
  );
}
