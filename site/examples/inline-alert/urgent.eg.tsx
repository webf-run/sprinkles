import { Button, InlineAlert } from '@webf/sprinkles';
import { Show, createSignal } from 'solid-js';

export default function Example() {
  const [failed, setFailed] = createSignal(false);

  return (
    <div class='flex w-full flex-col items-start gap-4'>
      {/* Shown after a failed save, so it interrupts: role='alert'. */}
      <Show when={failed()}>
        <InlineAlert
          urgent
          variant='negative'
          heading='Couldn’t save your changes'
          actions={
            <>
              <Button
                size='s'
                variant='secondary'
                onClick={() => setFailed(false)}
              >
                Try again
              </Button>
              <Button size='s' variant='secondary' fillStyle='outline'>
                Copy changes
              </Button>
            </>
          }
          class='w-full'
        >
          The server didn’t respond. Your changes are still here; nothing was
          lost.
        </InlineAlert>
      </Show>
      <Button onClick={() => setFailed(true)}>Save</Button>
    </div>
  );
}
