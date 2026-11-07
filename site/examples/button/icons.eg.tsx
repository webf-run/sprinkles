import { Button } from '@webf/sprinkles';
import ArrowRight from 'lucide-solid/icons/arrow-right';
import Download from 'lucide-solid/icons/download';
import Trash2 from 'lucide-solid/icons/trash-2';

export default function Example() {
  return (
    <>
      <Button variant='secondary' icon={Download}>
        Download
      </Button>
      <Button iconEnd={ArrowRight}>Continue</Button>
      <Button
        variant='negative'
        fillStyle='outline'
        icon={Trash2}
        aria-label='Delete page'
      />
    </>
  );
}
