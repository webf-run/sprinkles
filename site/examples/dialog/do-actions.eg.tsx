import { Button, Dialog, TextField } from '@webf/sprinkles';

export default function Example() {
  return (
    <Dialog
      trigger={(props) => (
        <Button {...props} variant='secondary'>
          Add redirect
        </Button>
      )}
      title='Add redirect'
      size='s'
      footer={(close) => (
        <>
          <Button variant='secondary' fillStyle='outline' onClick={close}>
            Cancel
          </Button>
          <Button onClick={close}>Add redirect</Button>
        </>
      )}
    >
      <div class='flex flex-col gap-4'>
        <TextField label='From' defaultValue='/admissions-2026' />
        <TextField label='To' defaultValue='/admissions-2027' />
      </div>
    </Dialog>
  );
}
