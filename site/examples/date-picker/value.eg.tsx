import { DatePicker } from '@webf/sprinkles';
import { createSignal } from 'solid-js';

export default function Example() {
  const [date, setDate] = createSignal<string | null>('2027-03-14');

  return (
    <div class='grid w-full max-w-xs gap-2'>
      <DatePicker
        label='Event date'
        value={date()}
        onValueChange={setDate}
        name='eventDate'
      />
      <p class='m-0 text-sm text-foreground-muted'>
        Stored as: {date() ?? 'null'}
      </p>
    </div>
  );
}
