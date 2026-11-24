import { Button, Slider } from '@webf/sprinkles';
import { createSignal } from 'solid-js';

export default function Example() {
  const [sent, setSent] = createSignal('');

  return (
    <form
      class='grid w-full max-w-sm gap-4'
      onSubmit={(event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        setSent(`volume=${String(data.get('volume'))}`);
      }}
    >
      <Slider label='Volume' name='volume' defaultValue={40} />
      <div>
        <Button type='submit'>Apply</Button>
      </div>
      <p class='m-0 text-sm text-foreground-muted'>Sent: {sent()}</p>
    </form>
  );
}
