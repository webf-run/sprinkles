import { Separator, Toggle } from '@webf/sprinkles';
import AlignCenter from 'lucide-solid/icons/align-center';
import AlignLeft from 'lucide-solid/icons/align-left';
import Bold from 'lucide-solid/icons/bold';
import Italic from 'lucide-solid/icons/italic';
import Underline from 'lucide-solid/icons/underline';

export default function Example() {
  return (
    <div
      class='flex h-10 items-center gap-1 rounded-xl border border-border-muted bg-surface px-1'
      role='toolbar'
      aria-label='Text formatting'
    >
      <Toggle quiet icon={Bold} aria-label='Bold' defaultPressed />
      <Toggle quiet icon={Italic} aria-label='Italic' />
      <Toggle quiet icon={Underline} aria-label='Underline' />
      <Separator orientation='vertical' class='mx-1 my-2' />
      <Toggle quiet icon={AlignLeft} aria-label='Align left' defaultPressed />
      <Toggle quiet icon={AlignCenter} aria-label='Align centre' />
    </div>
  );
}
