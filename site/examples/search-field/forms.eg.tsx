import { Button, SearchField } from '@webf/sprinkles';
import { createSignal } from 'solid-js';

export default function Example() {
  const [sent, setSent] = createSignal('');

  return (
    <form
      class='grid w-full max-w-sm gap-3'
      onSubmit={(event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        setSent(`search=${String(data.get('search'))}`);
      }}
    >
      <SearchField
        name='search'
        label='Search'
        placeholder='Search documents'
        description='At least 3 characters.'
        required
        minLength={3}
        maxLength={60}
      />
      <div>
        <Button type='submit'>Submit</Button>
      </div>
      <p class='m-0 text-sm text-foreground-muted'>Sent: {sent()}</p>
    </form>
  );
}
