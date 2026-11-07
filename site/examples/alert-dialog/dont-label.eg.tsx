import { AlertDialog, Button } from '@webf/sprinkles';

export default function Example() {
  return (
    <AlertDialog
      trigger={(props) => (
        <Button {...props} variant='negative' fillStyle='outline'>
          Delete page
        </Button>
      )}
      title='Are you sure?'
      confirmLabel='OK'
      onConfirm={() => {}}
    >
      This action is permanent.
    </AlertDialog>
  );
}
