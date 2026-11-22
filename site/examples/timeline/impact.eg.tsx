import { Timeline } from '@webf/sprinkles';

export default function Example() {
  return (
    <Timeline
      class='w-full max-w-md'
      marker='number'
      variant='seafoam'
      items={[
        {
          label: '2019',
          text: 'Our first community kitchen serves 100 meals a week.',
        },
        {
          label: '2021',
          text: 'Volunteers cook for three neighbourhoods, and we pass 50,000 meals.',
        },
        {
          label: '2023',
          text: 'A garden project starts, so families can grow their own food.',
        },
        {
          label: '2025',
          text: 'Together we have shared more than 250,000 meals.',
        },
      ]}
    />
  );
}
