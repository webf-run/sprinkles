import { IconTile } from '@webf/sprinkles';
import Bell from 'lucide-solid/icons/bell';

export default function Example() {
  return (
    <>
      <IconTile icon={Bell} variant='inverse' size='xl' />
      <IconTile icon={Bell} variant='neutral' size='l' />
      <IconTile icon={Bell} variant='accent' fillStyle='subtle' size='l' />
      <IconTile icon={Bell} variant='positive' size='m' />
    </>
  );
}
