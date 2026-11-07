import { AlertDialog, Button } from '@webf/sprinkles';

export default function Example() {
  return (
    <>
      <AlertDialog
        trigger={(props) => <Button {...props}>Publish</Button>}
        title='Publish “Admissions 2027”?'
        confirmLabel='Publish'
        onConfirm={() => {}}
      >
        The page goes live on the website straight away, at /admissions-2027.
      </AlertDialog>

      <AlertDialog
        variant='destructive'
        trigger={(props) => (
          <Button {...props} variant='negative'>
            Delete 3 images
          </Button>
        )}
        title='Delete 3 images?'
        confirmLabel='Delete'
        onConfirm={() => {}}
      >
        They’ll be removed from the media library and from every page that uses
        them. You can’t undo this.
      </AlertDialog>
    </>
  );
}
