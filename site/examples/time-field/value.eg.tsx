import { TimeField } from '@webf/sprinkles';
import { createSignal } from 'solid-js';

export default function Example() {
  const [time, setTime] = createSignal<string | null>('14:30');

  return (
    <div class='grid w-full max-w-xs gap-2'>
      <TimeField label='Start time' value={time()} onValueChange={setTime} />
      <p class='m-0 text-sm text-foreground-muted'>
        Stored as: {time() ?? 'null'}
      </p>
    </div>
  );
}
