import { Button, RangeSlider } from '@webf/sprinkles';
import { createSignal } from 'solid-js';

export default function Example() {
  const [sent, setSent] = createSignal('');

  return (
    <form
      class='grid w-full max-w-sm gap-4'
      onSubmit={(event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        setSent(
          `min=${String(data.get('min'))}, max=${String(data.get('max'))}`
        );
      }}
    >
      <RangeSlider
        label='Price range'
        startName='min'
        endName='max'
        defaultValue={{ start: 30, end: 60 }}
      />
      <div>
        <Button type='submit'>Apply</Button>
      </div>
      <p class='m-0 text-sm text-foreground-muted'>Sent: {sent()}</p>
    </form>
  );
}
