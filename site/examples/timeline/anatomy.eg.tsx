import { Timeline } from '@webf/sprinkles';

export default function Example() {
  return (
    <Timeline
      class='w-full max-w-sm'
      items={[
        {
          label: '2019',
          text: 'We open our first small shop on the high street.',
        },
        {
          label: '2023',
          text: 'A second shop opens, and we start delivering across the city.',
        },
      ]}
    />
  );
}
