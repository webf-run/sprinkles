import { TimeField } from '@webf/sprinkles';
import { createSignal } from 'solid-js';

export default function Example() {
  const [value, setValue] = createSignal<string | null>('11:45');

  return (
    <div class='grid w-full max-w-md gap-4'>
      <TimeField label='Uncontrolled value' defaultValue='09:30' />
      <div class='grid gap-2'>
        <TimeField label='Controlled value' value={value()} onValueChange={setValue} />
        <p class='m-0 text-sm text-foreground-muted' aria-live='polite'>
          Current value: {value() ?? 'No complete time selected'}
        </p>
      </div>
    </div>
  );
}
