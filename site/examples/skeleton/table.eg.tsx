import { Button, Skeleton } from '@webf/sprinkles';
import { For, Show, createSignal, onMount } from 'solid-js';

const Pages = [
  { title: 'Admissions 2027', edited: 'Asha Rao, 2 hours ago' },
  { title: 'About us', edited: 'Vikram Shah, yesterday' },
  { title: 'Campus life', edited: 'Meera Iyer, 3 days ago' },
];

export default function Example() {
  const [loaded, setLoaded] = createSignal(false);

  // Pretend the list takes two seconds to load.
  const load = () => {
    setLoaded(false);
    setTimeout(() => setLoaded(true), 2000);
  };
  onMount(load);

  return (
    <section
      aria-busy={!loaded()}
      aria-label='Pages'
      class='flex w-full max-w-md flex-col items-start gap-4'
    >
      <ul class='m-0 flex w-full list-none flex-col p-0'>
        <For each={Pages}>
          {(page) => (
            <li class='flex items-center gap-3 border-b border-border-muted py-3 last:border-b-0'>
              <Show
                when={loaded()}
                fallback={
                  <div class='flex flex-1 flex-col gap-2'>
                    <Skeleton class='w-2/5' />
                    <Skeleton class='w-3/5' />
                  </div>
                }
              >
                <div class='flex flex-1 flex-col'>
                  <span class='text-sm font-semibold text-foreground-strong'>
                    {page.title}
                  </span>
                  <span class='text-xs text-foreground-muted'>
                    {page.edited}
                  </span>
                </div>
              </Show>
            </li>
          )}
        </For>
      </ul>
      <Button size='s' variant='secondary' disabled={!loaded()} onClick={load}>
        Load again
      </Button>
    </section>
  );
}
