import { HeroBanner } from '@webf/sprinkles';
import { For } from 'solid-js';

const countdown = [
  { value: '24', label: 'Days' },
  { value: '06', label: 'Hours' },
  { value: '15', label: 'Minutes' },
];

/** A conference hero: centred copy over an audience, with a countdown. Wire it to a real timer. */
export default function Example() {
  return (
    <HeroBanner
      layout='overlay'
      surface='inverse'
      align='center'
      image='/images/cc/event-audience.jpg'
      imagePosition='center'
      eyebrow='12–14 March · Denver · Also online'
      title='Where product teams meet.'
      description='Three days of talks, workshops and hallway conversations with 80 speakers from companies building the products you use every day.'
      primaryAction={{ label: 'Get your ticket', href: '#tickets' }}
      secondaryAction={{ label: 'View the programme', href: '#programme' }}
      note='Early-bird prices end on 30 November'
      bottomContent={
        <ul
          aria-label='Time until the event starts'
          class='m-0 mx-auto grid max-w-md list-none grid-cols-3 gap-3 p-0'
        >
          <For each={countdown}>
            {(unit) => (
              <li class='rounded-2xl border border-border-inverse bg-surface-inverse/90 px-1 py-4 text-center text-foreground-inverse shadow-elevated'>
                <span class='block text-3xl font-semibold tabular-nums'>
                  {unit.value}
                </span>
                <span class='block text-xs tracking-normal text-foreground-inverse uppercase @xl:tracking-wide-130'>
                  {unit.label}
                </span>
              </li>
            )}
          </For>
        </ul>
      }
    />
  );
}
