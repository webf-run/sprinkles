import { Button, TimeField } from '@webf/sprinkles';
import { createSignal } from 'solid-js';

export default function Example() {
  const [submitted, setSubmitted] = createSignal<string | null>(null);

  const onSubmit = (event: SubmitEvent) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget as HTMLFormElement);
    setSubmitted(String(data.get('meetingTime')));
  };

  return (
    <form
      class='grid w-full max-w-xs justify-items-start gap-3'
      onSubmit={onSubmit}
    >
      <TimeField label='Meeting time' name='meetingTime' defaultValue='08:45' />
      <Button type='submit'>Submit</Button>
      <p class='m-0 text-sm text-foreground-muted' aria-live='polite'>
        Submitted: {submitted() || 'nothing yet'}
      </p>
    </form>
  );
}
