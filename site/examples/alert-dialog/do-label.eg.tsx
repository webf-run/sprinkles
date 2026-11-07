import { AlertDialog, Button } from '@webf/sprinkles';

export default function Example() {
  return (
    <AlertDialog
      variant='destructive'
      trigger={(props) => (
        <Button {...props} variant='negative' fillStyle='outline'>
          Delete page
        </Button>
      )}
      title='Delete “About us”?'
      confirmLabel='Delete page'
      onConfirm={() => {}}
    >
      Links to /about-us will show “Page not found”. You can’t undo this.
    </AlertDialog>
  );
}
