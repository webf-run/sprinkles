import { AlertDialog, Button } from '@webf/sprinkles';
import { createSignal } from 'solid-js';

export default function Example() {
  const [open, setOpen] = createSignal(false);
  const [outcome, setOutcome] = createSignal('');

  return (
    <div class='flex items-center gap-4'>
      {/* Saving finds a newer version on the server, so the app opens the dialog itself. */}
      <Button onClick={() => setOpen(true)}>Save</Button>
      <span class='text-sm text-foreground-muted'>{outcome()}</span>

      <AlertDialog
        open={open()}
        onOpenChange={setOpen}
        variant='destructive'
        title='This page changed while you were editing'
        confirmLabel='Overwrite'
        onConfirm={() => setOutcome('Your version was saved.')}
        secondaryLabel='Reload page'
        onSecondary={() => setOutcome('Reloaded Asha’s version.')}
        cancelLabel='Keep editing'
        onCancel={() => setOutcome('Still editing; nothing saved.')}
      >
        Asha Rao saved a newer version at 14:32. Overwrite it with your changes,
        or reload to see hers. Your changes are lost if you reload.
      </AlertDialog>
    </div>
  );
}
