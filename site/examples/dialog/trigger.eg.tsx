import { Button, Dialog, TextField } from '@webf/sprinkles';
import Pencil from 'lucide-solid/icons/pencil';

export default function Example() {
  return (
    <Dialog
      trigger={(props) => (
        <Button {...props} variant='secondary' icon={Pencil}>
          Rename
        </Button>
      )}
      title='Rename page'
      size='s'
      footer={(close) => (
        <>
          <Button variant='secondary' fillStyle='outline' onClick={close}>
            Cancel
          </Button>
          <Button onClick={close}>Rename</Button>
        </>
      )}
    >
      <TextField label='Page title' defaultValue='About us' />
    </Dialog>
  );
}
