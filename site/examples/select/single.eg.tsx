import { Select } from '@webf/sprinkles';
import { createSignal } from 'solid-js';

const Templates = [
  { label: 'Standard page', value: 'standard' },
  { label: 'Landing page', value: 'landing' },
  { label: 'Blog post', value: 'post' },
  { label: 'Event', value: 'event' },
  { label: 'Contact', value: 'contact' },
];

export default function Example() {
  const [template, setTemplate] = createSignal<string | null>(null);

  return (
    <div class='grid w-full max-w-xs gap-2'>
      <Select
        label='Template'
        placeholder='Choose a template'
        items={Templates}
        value={template()}
        onValueChange={setTemplate}
        name='template'
      />
      <p class='m-0 text-sm text-foreground-muted'>
        Value: {template() ?? 'null'}
      </p>
    </div>
  );
}
