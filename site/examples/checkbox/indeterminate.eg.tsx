import { Checkbox } from '@webf/sprinkles';
import { For, createSignal } from 'solid-js';

const Channels = [
  { label: 'Website', value: 'website' },
  { label: 'Newsletter', value: 'newsletter' },
  { label: 'Social media', value: 'social' },
];

export default function Example() {
  const [chosen, setChosen] = createSignal<string[]>(['website']);
  const all = () => chosen().length === Channels.length;
  const some = () => chosen().length > 0 && !all();

  const toggle = (value: string, checked: boolean) =>
    setChosen((current) =>
      checked ? [...current, value] : current.filter((item) => item !== value)
    );

  return (
    <div class='grid'>
      <Checkbox
        label='Publish to every channel'
        checked={all()}
        indeterminate={some()}
        onCheckedChange={(checked) =>
          setChosen(checked ? Channels.map((channel) => channel.value) : [])
        }
      />
      <div class='grid pl-6'>
        <For each={Channels}>
          {(channel) => (
            <Checkbox
              label={channel.label}
              name='channels'
              value={channel.value}
              checked={chosen().includes(channel.value)}
              onCheckedChange={(checked) => toggle(channel.value, checked)}
            />
          )}
        </For>
      </div>
    </div>
  );
}
