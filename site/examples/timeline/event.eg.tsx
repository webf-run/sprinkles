import { Timeline } from '@webf/sprinkles';

export default function Example() {
  return (
    <div class='w-full max-w-xl'>
      <h3 class='m-0 mb-5 font-heading text-fluid-xl font-semibold text-foreground-strongest'>
        Saturday 14 June
      </h3>
      <Timeline
        layout='split'
        tone='highlight'
        items={[
          {
            label: '9:00',
            text: 'Doors open. Pick up your badge and have a coffee.',
          },
          {
            label: '10:00',
            text: 'Opening talk: designing for people, not screens.',
          },
          {
            label: '12:30',
            text: 'Lunch in the garden, with plenty of vegetarian choices.',
          },
          {
            label: '2:00',
            text: 'Workshops: choose one of four hands-on sessions.',
          },
          { label: '5:00', text: 'Closing panel, then drinks and music.' },
        ]}
      />
    </div>
  );
}
