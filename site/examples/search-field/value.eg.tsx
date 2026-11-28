import { SearchField } from '@webf/sprinkles';
import { createSignal } from 'solid-js';

export default function Example() {
  const [value, setValue] = createSignal('');
  const [submitted, setSubmitted] = createSignal('');

  return (
    <div class='grid w-full max-w-sm gap-3'>
      <SearchField
        label='Search documents'
        placeholder='Search documents'
        value={value()}
        onValueChange={setValue}
        onSubmit={setSubmitted}
      />
      <p class='m-0 text-sm text-foreground-muted'>
        Value: {value()}
        <br />
        Submitted: {submitted()}
      </p>
    </div>
  );
}
