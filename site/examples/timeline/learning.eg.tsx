import { Timeline } from '@webf/sprinkles';

export default function Example() {
  return (
    <Timeline
      class='w-full'
      layout='cards'
      marker='number'
      tone='purple'
      items={[
        {
          label: 'Week 1',
          text: 'Learn the basics with short videos and a friendly first exercise.',
        },
        {
          label: 'Weeks 2 and 3',
          text: 'Build a small project, with feedback from your mentor.',
        },
        {
          label: 'Week 4',
          text: 'Join a live review session and ask your questions.',
        },
        {
          label: 'Week 6',
          text: 'Present your finished project and earn your certificate.',
        },
      ]}
    />
  );
}
