import { Badge, Button, Dialog } from '@webf/sprinkles';
import History from 'lucide-solid/icons/history';

const Revisions = Array.from({ length: 24 }, (_, index) => ({
  id: 24 - index,
  author: ['Asha Rao', 'Vikram Shah', 'Meera Iyer'][index % 3],
  when: `${index + 1} day${index ? 's' : ''} ago`,
  published: index % 5 === 0,
}));

export default function Example() {
  return (
    <Dialog
      trigger={(props) => (
        <Button {...props} variant='secondary' icon={History}>
          Revision history
        </Button>
      )}
      title='Revision history'
      description='“Admissions 2027”, newest first.'
      footer={(close) => (
        <Button variant='secondary' fillStyle='outline' onClick={close}>
          Close
        </Button>
      )}
    >
      <ol class='m-0 flex list-none flex-col p-0'>
        {Revisions.map((revision) => (
          <li class='flex items-center gap-3 border-b border-border-muted py-3 last:border-b-0'>
            <span class='font-semibold text-foreground-strong'>
              #{revision.id}
            </span>
            <span class='flex-1'>
              {revision.author}, {revision.when}
            </span>
            {revision.published && <Badge variant='positive'>Published</Badge>}
          </li>
        ))}
      </ol>
    </Dialog>
  );
}
