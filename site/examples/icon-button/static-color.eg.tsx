import { IconButton } from '@webf/sprinkles';
import Expand from 'lucide-solid/icons/expand';
import ImagePlus from 'lucide-solid/icons/image-plus';
import Trash from 'lucide-solid/icons/trash';

export default function Example() {
  return (
    <div class='flex w-full flex-wrap gap-6'>
      <div class='flex flex-1 flex-wrap gap-2 rounded-2xl bg-surface-inverse p-6'>
        <IconButton
          staticColor='white'
          icon={ImagePlus}
          aria-label='Replace image'
        />
        <IconButton
          staticColor='white'
          fillStyle='outline'
          icon={Expand}
          aria-label='View full size'
        />
        <IconButton
          staticColor='white'
          quiet
          icon={Trash}
          aria-label='Remove image'
        />
      </div>
      <div class='flex flex-1 flex-wrap gap-2 rounded-2xl bg-highlight p-6'>
        <IconButton
          staticColor='black'
          icon={ImagePlus}
          aria-label='Replace image'
        />
        <IconButton
          staticColor='black'
          fillStyle='outline'
          icon={Expand}
          aria-label='View full size'
        />
        <IconButton
          staticColor='black'
          quiet
          icon={Trash}
          aria-label='Remove image'
        />
      </div>
    </div>
  );
}
