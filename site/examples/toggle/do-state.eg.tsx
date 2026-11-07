import { Toggle } from '@webf/sprinkles';
import Bold from 'lucide-solid/icons/bold';
import Italic from 'lucide-solid/icons/italic';

export default function Example() {
  return (
    <div
      class='flex items-center gap-1'
      role='toolbar'
      aria-label='Text formatting'
    >
      <Toggle icon={Bold} aria-label='Bold' defaultPressed />
      <Toggle icon={Italic} aria-label='Italic' />
    </div>
  );
}
