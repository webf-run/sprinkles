import { Button, Popover } from '@webf/sprinkles';
import Users from 'lucide-solid/icons/users';

export default function Example() {
  return (
    <Popover
      arrow
      placement='bottom'
      trigger={(props) => (
        <Button {...props} variant='secondary' icon={Users}>
          2 editing
        </Button>
      )}
      title='Also editing this page'
      class='w-64'
    >
      <ul class='m-0 flex list-none flex-col gap-1 p-0'>
        <li>Asha Rao, since 14:05</li>
        <li>Vikram Shah, since 14:21</li>
      </ul>
    </Popover>
  );
}
