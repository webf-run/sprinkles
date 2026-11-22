import { Timeline } from '@webf/sprinkles';

export default function Example() {
  return (
    <Timeline
      class='w-full'
      layout='alternating'
      variant='indigo'
      items={[
        {
          label: '2021',
          text: 'Three friends start Tidewater in a spare room and ship the first version of the booking tool.',
        },
        {
          label: '2022',
          text: 'The first 100 teams sign up, and we hire our first support person.',
        },
        { label: '2023', text: 'Calendar sync and a mobile app launch.' },
        {
          label: '2025',
          text: 'More than 5,000 teams in 40 countries now plan their week with Tidewater.',
        },
      ]}
    />
  );
}
