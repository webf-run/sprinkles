import { Separator, Toggle } from '@webf/sprinkles';
import Italic from 'lucide-solid/icons/italic';
import LetterB from 'lucide-solid/icons/letter-b';
import TextAlignCenter from 'lucide-solid/icons/text-align-center';
import TextAlignStart from 'lucide-solid/icons/text-align-start';
import Underline from 'lucide-solid/icons/underline';

export default function Example() {
  return (
    <div
      class='box-border flex h-10 items-center gap-1 rounded-xl border border-border-muted bg-surface px-1'
      role='toolbar'
      aria-label='Text formatting'
    >
      <Toggle quiet icon={LetterB} aria-label='Bold' defaultPressed />
      <Toggle quiet icon={Italic} aria-label='Italic' />
      <Toggle quiet icon={Underline} aria-label='Underline' />
      <Separator orientation='vertical' class='mx-1 my-2' />
      <Toggle
        quiet
        icon={TextAlignStart}
        aria-label='Align left'
        defaultPressed
      />
      <Toggle quiet icon={TextAlignCenter} aria-label='Align centre' />
    </div>
  );
}
