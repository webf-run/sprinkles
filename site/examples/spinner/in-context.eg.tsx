import { Button, Spinner } from '@webf/sprinkles';
import { Show, createSignal, onMount } from 'solid-js';

export default function Example() {
  const [loading, setLoading] = createSignal(true);

  const reload = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  };
  onMount(reload);

  return (
    <div class='flex w-full flex-col items-start gap-4'>
      <div class='flex h-24 w-full max-w-md items-center justify-center rounded-2xl border border-border-muted'>
        <Show
          when={!loading()}
          fallback={<Spinner label='Loading revision preview' />}
        >
          <span class='text-sm text-foreground-muted'>
            Revision #24 by Asha Rao
          </span>
        </Show>
      </div>
      <Button
        size='s'
        variant='secondary'
        disabled={loading()}
        onClick={reload}
      >
        Load again
      </Button>
    </div>
  );
}
