import { HeroBanner } from '@webf/sprinkles';
import { For } from 'solid-js';

const countdown = [
  { value: '24', label: 'Days' },
  { value: '06', label: 'Hours' },
  { value: '15', label: 'Minutes' },
];

/** A conference hero: centred copy over a night skyline, with a countdown along the bottom. Wire the numbers to a real timer. */
export default function Example() {
  return (
    <HeroBanner
      layout='overlay'
      variant='indigo'
      align='center'
      image='/images/cc/finance.jpg'
      imagePosition='center'
      imageCredit={{
        text: 'Photo: Brian Papantonio · CC BY 2.0',
        href: 'https://commons.wikimedia.org/wiki/File:Denver_Skyline_at_Blue_Hour.jpg',
      }}
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
              <li class='rounded-2xl border border-white/25 bg-indigo/70 px-2 py-4 text-center text-white shadow-lg backdrop-blur-md'>
                <span class='block text-3xl font-semibold tabular-nums'>
                  {unit.value}
                </span>
                <span class='block text-xs tracking-widest text-white/85 uppercase'>
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
