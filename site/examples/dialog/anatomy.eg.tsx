import { Button, Dialog, TextField } from '@webf/sprinkles';

export default function Example() {
  return (
    <Dialog
      trigger={(props) => (
        <Button {...props} variant='secondary'>
          Page settings
        </Button>
      )}
      title='Page settings'
      description='These apply to “Admissions 2027” only.'
      footer={(close) => (
        <>
          <Button variant='secondary' fillStyle='outline' onClick={close}>
            Cancel
          </Button>
          <Button onClick={close}>Save settings</Button>
        </>
      )}
    >
      <div class='flex flex-col gap-4'>
        <TextField
          label='URL slug'
          defaultValue='admissions-2027'
          description='Changing it breaks links to the page.'
        />
        <TextField
          label='Search title'
          defaultValue='Admissions 2027 | The Foundation'
        />
      </div>
    </Dialog>
  );
}
