import { Timeline } from '@webf/sprinkles';
import type { TimelineVariant } from '@webf/sprinkles';
import { For } from 'solid-js';

const tones: TimelineVariant[] = [
  'accent',
  'informative',
  'positive',
  'notice',
  'negative',
  'highlight',
  'seafoam',
  'indigo',
  'purple',
  'fuchsia',
  'yellow',
  'neutral',
];

export default function Example() {
  return (
    <div class='grid w-full gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-3'>
      <For each={tones}>
        {(tone) => (
          <div>
            <p class='m-0 mb-3 text-fluid-xs font-semibold text-foreground-muted uppercase'>
              {tone}
            </p>
            <Timeline
              variant={tone}
              items={[
                { label: '2022', text: 'The idea' },
                { label: '2024', text: 'The launch' },
              ]}
            />
          </div>
        )}
      </For>
    </div>
  );
}
