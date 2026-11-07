import { IconButton } from '@webf/sprinkles';
import Plus from 'lucide-solid/icons/plus';

export default function Example() {
  return (
    <>
      <IconButton size='s' icon={Plus} aria-label='New page' />
      <IconButton size='m' icon={Plus} aria-label='New page' />
      <IconButton size='l' icon={Plus} aria-label='New page' />
      <IconButton size='xl' icon={Plus} aria-label='New page' />
    </>
  );
}
