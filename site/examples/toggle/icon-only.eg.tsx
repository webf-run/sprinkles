import { Toggle } from '@webf/sprinkles';
import Italic from 'lucide-solid/icons/italic';
import LetterB from 'lucide-solid/icons/letter-b';
import Underline from 'lucide-solid/icons/underline';

export default function Example() {
  return (
    <div
      class='flex items-center gap-1'
      role='toolbar'
      aria-label='Text formatting'
    >
      <Toggle icon={LetterB} aria-label='Bold' defaultPressed />
      <Toggle icon={Italic} aria-label='Italic' />
      <Toggle icon={Underline} aria-label='Underline' />
    </div>
  );
}
