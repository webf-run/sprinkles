import { TimeField } from '@webf/sprinkles';
import { createSignal } from 'solid-js';

export default function Example() {
  const [submitted, setSubmitted] = createSignal('');

  const handleSubmit = (event: SubmitEvent) => {
    event.preventDefault();
    const form = event.currentTarget as HTMLFormElement;
    const data = new FormData(form);
    setSubmitted(String(data.get('meetingTime') ?? 'No time entered'));
  };

  return (
    <form class='grid w-full max-w-sm gap-3' onSubmit={handleSubmit}>
      <TimeField
        label='Meeting time'
        name='meetingTime'
        defaultValue='08:45'
      />
      <button type='submit' class='w-fit rounded-md border px-3 py-2'>
        Submit time
      </button>
      <p class='m-0 text-sm text-foreground-muted' aria-live='polite'>
        Submitted value: {submitted() || 'Not submitted'}
      </p>
    </form>
  );
}
