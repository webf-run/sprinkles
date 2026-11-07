import { IconButton } from '@webf/sprinkles';
import Pencil from 'lucide-solid/icons/pencil';
import Trash2 from 'lucide-solid/icons/trash-2';

export default function Example() {
  return (
    <ul class='m-0 flex w-full list-none flex-col p-0 text-sm text-foreground'>
      {['Admissions 2027', 'Scholarships'].map((title) => (
        <li class='flex items-center gap-2 border-b border-border-muted py-1'>
          <span class='flex-1'>{title}</span>
          <IconButton
            quiet
            size='s'
            icon={Pencil}
            aria-label={`Edit ${title}`}
          />
          <IconButton
            quiet
            size='s'
            variant='negative'
            icon={Trash2}
            aria-label={`Delete ${title}`}
          />
        </li>
      ))}
    </ul>
  );
}
