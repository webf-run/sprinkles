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
            variant='accent'
            size='s'
            icon={Pencil}
            aria-label={`Edit ${title}`}
          />
          <IconButton
            variant='negative'
            size='s'
            icon={Trash2}
            aria-label={`Delete ${title}`}
          />
        </li>
      ))}
    </ul>
  );
}
