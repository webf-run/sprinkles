import { NumberInput } from '@webf/sprinkles';
import { createSignal } from 'solid-js';

export default function Example() {
  const [minutes, setMinutes] = createSignal<number | null>(5);

  return (
    <div class='grid w-full max-w-xs gap-2'>
      <NumberInput
        label='Reading time (minutes)'
        description='Between 1 and 60.'
        min={1}
        max={60}
        value={minutes()}
        onValueChange={setMinutes}
        name='readingTime'
      />
      <p class='m-0 text-sm text-foreground-muted'>
        Value: {minutes() ?? 'null'}
      </p>
    </div>
  );
}
