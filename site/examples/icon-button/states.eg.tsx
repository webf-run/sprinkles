import { IconButton } from '@webf/sprinkles';
import Pencil from 'lucide-solid/icons/pencil';

export default function Example() {
  return (
    <div class='flex flex-col gap-4'>
      <div class='flex flex-wrap items-center gap-3'>
        <IconButton icon={Pencil} aria-label='Default' />
        <IconButton icon={Pencil} aria-label='Hover' class='bg-neutral/12' />
        <IconButton icon={Pencil} aria-label='Pressed' class='bg-neutral/20' />
        <IconButton
          icon={Pencil}
          aria-label='Keyboard focus'
          class='outline-solid outline-2 outline-offset-2 outline-focus-ring'
        />
        <IconButton icon={Pencil} aria-label='Disabled' disabled />
        <IconButton icon={Pencil} aria-label='Saving' pending />
      </div>
      <div class='flex flex-wrap items-center gap-3'>
        <IconButton quiet icon={Pencil} aria-label='Default' />
        <IconButton
          quiet
          icon={Pencil}
          aria-label='Hover'
          class='bg-neutral-subtle'
        />
        <IconButton
          quiet
          icon={Pencil}
          aria-label='Pressed'
          class='bg-neutral/12'
        />
        <IconButton
          quiet
          icon={Pencil}
          aria-label='Keyboard focus'
          class='outline-solid outline-2 outline-offset-2 outline-focus-ring'
        />
        <IconButton quiet icon={Pencil} aria-label='Disabled' disabled />
        <IconButton quiet icon={Pencil} aria-label='Saving' pending />
      </div>
    </div>
  );
}
