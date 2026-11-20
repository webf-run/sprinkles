import { Timeline } from '@webf/sprinkles';

export default function Example() {
  return (
    <Timeline
      class='w-full'
      layout='split'
      items={[
        {
          label: '2019',
          text: 'We open our first small shop on the high street.',
        },
        { label: '2021', text: 'We start delivering across the city.' },
        {
          label: '2023',
          text: 'A second shop opens, and the team grows to twelve.',
        },
        {
          label: '2025',
          text: 'We bake for more than 2,000 neighbours every week.',
        },
      ]}
    />
  );
}
