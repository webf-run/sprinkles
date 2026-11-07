import { AlertDialog, Button } from '@webf/sprinkles';
import { createSignal } from 'solid-js';

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export default function Example() {
  const [status, setStatus] = createSignal('Draft');

  return (
    <div class='flex items-center gap-4'>
      <AlertDialog
        trigger={(props) => <Button {...props}>Publish</Button>}
        title='Publish “Admissions 2027”?'
        confirmLabel='Publish'
        onConfirm={async () => {
          // Return the promise: the button shows a spinner until it settles.
          await wait(1500);
          setStatus('Published');
        }}
      >
        The page goes live on the website straight away.
      </AlertDialog>
      <span class='text-sm text-foreground-muted'>Status: {status()}</span>
    </div>
  );
}
