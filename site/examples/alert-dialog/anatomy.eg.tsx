import { AlertDialog, Button } from '@webf/sprinkles';
import Trash2 from 'lucide-solid/icons/trash-2';

export default function Example() {
  return (
    <AlertDialog
      variant='destructive'
      trigger={(props) => (
        <Button {...props} variant='negative' fillStyle='outline' icon={Trash2}>
          Delete image
        </Button>
      )}
      title='Delete “Hostel tour.jpg”?'
      confirmLabel='Delete'
      onConfirm={() => {}}
    >
      It’s used on 2 pages, which will show an empty space instead. You can’t
      undo this.
    </AlertDialog>
  );
}
