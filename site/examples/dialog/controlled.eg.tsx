import { Button, Dialog } from '@webf/sprinkles';
import { createSignal } from 'solid-js';

export default function Example() {
  const [open, setOpen] = createSignal(false);
  const [folder, setFolder] = createSignal('Campus life');

  const move = (target: string) => {
    setFolder(target);
    setOpen(false);
  };

  return (
    <div class='flex flex-col items-start gap-3'>
      <p class='m-0 text-sm text-foreground-muted'>
        “Hostel tour.jpg” is in{' '}
        <strong class='text-foreground-strong'>{folder()}</strong>.
      </p>
      <Button variant='secondary' onClick={() => setOpen(true)}>
        Move image
      </Button>

      <Dialog
        open={open()}
        onOpenChange={setOpen}
        title='Move “Hostel tour.jpg”'
        description='Choose a folder in the media library.'
        size='s'
        footer={
          <Button
            variant='secondary'
            fillStyle='outline'
            onClick={() => setOpen(false)}
          >
            Cancel
          </Button>
        }
      >
        <div class='flex flex-col gap-2'>
          {['Campus life', 'Events', 'Faculty portraits'].map((target) => (
            <Button
              variant='secondary'
              class='justify-start'
              onClick={() => move(target)}
            >
              {target}
            </Button>
          ))}
        </div>
      </Dialog>
    </div>
  );
}
